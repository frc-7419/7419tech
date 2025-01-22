import { NavHeader } from "@/components/NavHeader"
import Image from "next/image"

export default function BlogPage() {
  return (
    <>
      <NavHeader />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-3">
        <Image src="/logo.png" alt="7419 Logo" width={150} height={150} className="mb-8" />
        <h1 className="text-4xl font-bold text-center mb-4">Blog Coming Soon</h1>
        <p className="text-xl text-center text-gray-600">
          We're working hard to bring you amazing content. Stay tuned!
        </p>
      </div>
    </>
  )
}

