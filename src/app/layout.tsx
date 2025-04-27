import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/vazirmatn/400.css"; // Regular weight
import "@fontsource/vazirmatn/700.css"; // Bold weight

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "پزشک یار هوشمند",
  description: "دستیار پزشک هوشمند مبتنی بر هوش مصنوعی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${geistMono.variable} antialiased font-vazirmatn`}
      >
        {children}
      </body>
    </html>
  );
}
