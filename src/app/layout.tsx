import type { Metadata } from "next"
import { Cabin, Work_Sans } from "next/font/google"
import Image from "next/image"
import ErrorBoundary from "@/components/ErrorBoundary"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
import "./globals.css"
import PageTransition from "@/components/PageTransition"

export const metadata: Metadata = {
  title: "7419 QLS Tech Support",
  description:
    "Official website of 7419 QLS Tech Support, a student-led FIRST Robotics Competition team from The Quarry Lane School in Dublin, California.",
  // Declared here so Next puts it in <head>; a bare <link> outside <head> was ignored and browsers hit /favicon.ico (404).
  icons: { icon: "/7419.ico" },
}

// 7419 Branding Standards §4: Cabin for titles, Work Sans for body text.
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-body" })
const cabin = Cabin({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-display" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} ${workSans.variable} ${cabin.variable}`}>
        <ErrorBoundary>
          <AuthProvider>
            <PageTransition>
              <MobileCheck>{children}</MobileCheck>
            </PageTransition>
            <Toaster />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

function MobileCheck({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hidden md:block">{children}</div>
      <div className="md:hidden">
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#122350] p-4 text-white">
          <Image src="/Logo.png" alt="7419 Logo" width={247} height={150} className="mb-8 h-[150px] w-auto" style={{ width: "auto" }} />
          <h1 className="mb-4 text-center text-2xl font-bold">Mobile Not Yet Supported</h1>
          <p className="text-center text-white/80">Please visit our website on a desktop or tablet device.</p>
        </div>
      </div>
    </>
  )
}
