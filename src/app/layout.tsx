import type { Metadata } from "next";

import ToastProvider from "./provider/ToastProvider";

import "../styles/fonts.css";
import "./globals.css";

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
      <body className="bg-background">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
