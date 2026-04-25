import "./globals.css";

export const metadata = {
  title: "Job Coin | AI Took Your Job. Come Work For The Coin.",
  description:
    "Job Coin uses creator fees to buy back JOB and pay verified workers building the coin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f4f2ee]">{children}</body>
    </html>
  );
}
