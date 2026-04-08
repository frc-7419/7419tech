import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const bgClassMap: Record<string, string> = {
  white: 'bg-white',
  'gray-500': 'bg-gray-500',
}

interface ProfileProps {
  direction?: "left" | "right"
  name: string
  description: string
  logoUrl: string
  websiteUrl: string
  backgrondColor: string
}

export default function Profile({
  direction = "left",
  name,
  description,
  logoUrl,
  websiteUrl,
  backgrondColor,
}: ProfileProps) {
  return (
    <Card className={`border-0 ${bgClassMap[backgrondColor] || ''} shadow-none bg-opacity-5 mx-4 md:mx-10`}>
      <CardContent className="p-6 md:p-8">
        <div
          className={`flex flex-col items-center gap-6 md:flex-row ${
            direction === "right" ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-shrink-0 py-6 md:py-12">
            <div className="relative h-[150px] w-[150px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <Image
                src={logoUrl}
                alt={`${name} logo`}
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-4xl font-bold">{name}</h2>
            </div>
            <p className="text-gray-600">{description}</p>
            <Button 
              size="lg" 
              variant="outline"
              className="border-[#11224e] text-[#11224e] hover:bg-[#11224e] hover:text-white transition-colors w-full sm:w-auto"
              asChild>
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                Visit Site
              </a>
            </Button>
          </div>
          
        </div>
      </CardContent>
    </Card>
  )
}

