import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { LATEST_WINNERS_LIMIT, PUBLIC_RECORD_LIMIT } from "@/lib/constants";

let database;

function getDatabasePath() {
  const dataDirectory = path.join(process.cwd(), "data");
  fs.mkdirSync(dataDirectory, { recursive: true });
  return path.join(dataDirectory, "lotto.db");
}

function initialize(databaseInstance) {
  databaseInstance.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS draws (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      draw_number INTEGER NOT NULL UNIQUE,
      timestamp TEXT NOT NULL,
      total_tickets INTEGER NOT NULL DEFAULT 0,
      winning_ticket INTEGER,
      winner_wallet TEXT,
      random_number TEXT,
      amount_sol REAL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending',
      vrf_request_tx TEXT,
      vrf_fulfillment_tx TEXT,
      payout_tx TEXT
    );

    CREATE TABLE IF NOT EXISTS winners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wallet TEXT NOT NULL,
      amount_sol REAL NOT NULL DEFAULT 0,
      tx_hash TEXT,
      draw_id INTEGER,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(draw_id) REFERENCES draws(id)
    );
  `);
}

function db() {
  if (!database) {
    database = new Database(getDatabasePath());
    initialize(database);
  }

  return database;
}

export function getNextDrawNumber() {
  const row = db().prepare("SELECT COALESCE(MAX(draw_number), 0) AS current FROM draws").get();
  return Number(row.current || 0) + 1;
}

export function insertDraw(record) {
  const result = db()
    .prepare(`
      INSERT INTO draws (
        draw_number,
        timestamp,
        total_tickets,
        winning_ticket,
        winner_wallet,
        random_number,
        amount_sol,
        status,
        vrf_request_tx,
        vrf_fulfillment_tx,
        payout_tx
      ) VALUES (
        @drawNumber,
        @timestamp,
        @totalTickets,
        @winningTicket,
        @winnerWallet,
        @randomNumber,
        @amountSol,
        @status,
        @vrfRequestTx,
        @vrfFulfillmentTx,
        @payoutTx
      )
    `)
    .run({
      drawNumber: record.drawNumber,
      timestamp: record.timestamp,
      totalTickets: record.totalTickets,
      winningTicket: record.winningTicket,
      winnerWallet: record.winnerWallet,
      randomNumber: record.randomNumber,
      amountSol: record.amountSol ?? 0,
      status: record.status,
      vrfRequestTx: record.vrfRequestTx ?? null,
      vrfFulfillmentTx: record.vrfFulfillmentTx ?? null,
      payoutTx: record.payoutTx ?? null,
    });

  return Number(result.lastInsertRowid);
}

export function insertWinner(record) {
  const result = db()
    .prepare(`
      INSERT INTO winners (wallet, amount_sol, tx_hash, draw_id, created_at)
      VALUES (@wallet, @amountSol, @txHash, @drawId, @createdAt)
    `)
    .run({
      wallet: record.wallet,
      amountSol: record.amountSol,
      txHash: record.txHash ?? null,
      drawId: record.drawId ?? null,
      createdAt: record.createdAt ?? new Date().toISOString(),
    });

  return Number(result.lastInsertRowid);
}

export function getLatestWinners(limit = LATEST_WINNERS_LIMIT) {
  return db()
    .prepare(`
      SELECT
        id,
        wallet,
        amount_sol AS amountSol,
        tx_hash AS txHash,
        draw_id AS drawId,
        created_at AS createdAt
      FROM winners
      ORDER BY datetime(created_at) DESC
      LIMIT ?
    `)
    .all(limit);
}

export function getPublicRecord(limit = PUBLIC_RECORD_LIMIT) {
  return db()
    .prepare(`
      SELECT
        id,
        draw_number AS drawNumber,
        timestamp,
        winner_wallet AS winnerWallet,
        amount_sol AS amountSol,
        vrf_request_tx AS vrfRequestTx,
        vrf_fulfillment_tx AS vrfFulfillmentTx,
        payout_tx AS payoutTx,
        status
      FROM draws
      ORDER BY draw_number DESC
      LIMIT ?
    `)
    .all(limit);
}

export function getDatabaseStats() {
  const drawsCompleted = db().prepare("SELECT COUNT(*) AS count FROM draws").get();
  const paidOut = db()
    .prepare("SELECT COALESCE(SUM(amount_sol), 0) AS totalSolPaidOut FROM winners")
    .get();

  return {
    drawsCompleted: Number(drawsCompleted.count || 0),
    totalSolPaidOut: Number(paidOut.totalSolPaidOut || 0),
  };
}

export function exportLotteryData() {
  return {
    exportedAt: new Date().toISOString(),
    draws: db().prepare("SELECT * FROM draws ORDER BY draw_number DESC").all(),
    winners: db().prepare("SELECT * FROM winners ORDER BY datetime(created_at) DESC").all(),
  };
}
