import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Time Board",
  description: "Check local time across key global markets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
