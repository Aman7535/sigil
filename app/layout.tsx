import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sigil",
  description: "A visual exploration of event-driven execution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
