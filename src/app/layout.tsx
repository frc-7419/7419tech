import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Image from "next/image"
import "./globals.css"

export const metadata: Metadata = {
  title: "7419",
  description: "7419 tech support's team website",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MobileCheck>{children}</MobileCheck>
      </body>
    </html>
  )
}

function MobileCheck({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hidden md:block">{children}</div>
      <div className="md:hidden">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <Image src="/Logo.png" alt="7419 Logo" width={150} height={150} className="mb-8" />
          <h1 className="text-2xl font-bold text-center mb-4">Mobile Not Yet Supported</h1>
          <p className="text-center">Please visit our website on a desktop or tablet device.</p>
        </div>
      </div>
    </>
  )
}

