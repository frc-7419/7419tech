import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1b2947] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent mb-4">
        404
      </h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-400 text-base sm:text-lg mb-8 max-w-md">
        Looks like this page got lost in the arena. Head back to the home page to get back on track.
      </p>
      <Button asChild size="lg" className="bg-[#ffc14a] text-[#11224e] hover:bg-[#ffcd6b] transition-colors">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
