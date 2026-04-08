import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import ErrorBoundary from "@/components/ErrorBoundary"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
import "./globals.css"
import PageTransition from "@/components/PageTransition"

export const metadata: Metadata = {
  title: "7419",
  description: "7419 tech support's team website",
  icons: { icon: "/7419.ico" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        <ErrorBoundary>
          <AuthProvider>
            <PageTransition>{children}</PageTransition>
            <Toaster />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
