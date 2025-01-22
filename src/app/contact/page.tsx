import { NavHeader } from "@/components/NavHeader"
import Image from "next/image"

export default function ContactPage() {
  return (
    <>
      <NavHeader />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Image src="/logo.png" alt="7419 Logo" width={150} height={150} className="mb-8" />
        <h1 className="text-4xl font-bold text-center mb-4">Contact Page Coming Soon</h1>
      </div>
    </>
  )
}

