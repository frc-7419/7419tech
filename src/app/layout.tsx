import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";


export const metadata: Metadata = {
  title: "7419",
  description: "7419 tech support's team website",
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
        className={inter.className}>
        {children}
      </body>
    </html>
  );
}
