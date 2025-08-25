import type { Metadata } from "next";
import "./globals.css";
import "../styles/fonts.css";

export const metadata: Metadata = {
  title: "دختران ایران زمین",
  description: "دانش، کوشش مساوی با فردای بهتر در مدارس دختران ایران زمین",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
