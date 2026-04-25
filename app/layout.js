import "./globals.css";

export const metadata = {
  title: "$LOTTO | No Forms. No Filing. Just Winners.",
  description:
    "Official on-chain registry, live prize pool, public record, and holder ticket lookup for the $LOTTO Solana lottery program.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
