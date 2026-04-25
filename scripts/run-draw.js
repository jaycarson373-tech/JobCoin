import { runDraw } from "../lib/lottery.js";

async function main() {
  const result = await runDraw();
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
