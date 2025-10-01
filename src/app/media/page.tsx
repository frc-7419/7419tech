'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NavHeader from "@/components/NavHeader";
import { SeasonMedia2025, SeasonMedia2024, SeasonMedia2023 } from "@/components/DynamicMedia";

export default function MediaPage() {
  return (
    <>
      <NavHeader />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Media Gallery</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our journey through competitions, outreach events, and team moments across different seasons.
            </p>
          </div>

          <Tabs defaultValue="2025-26" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="2025-26">2025-26 Season</TabsTrigger>
              <TabsTrigger value="2024-25">2024-25 Season</TabsTrigger>
              <TabsTrigger value="2023-24">2023-24 Season</TabsTrigger>
            </TabsList>

            <TabsContent value="2025-26" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4">2025-26 Season</h2>
                <SeasonMedia2025 />
              </div>
            </TabsContent>

            <TabsContent value="2024-25" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4">2024-25 Season</h2>
                <SeasonMedia2024 />
              </div>
            </TabsContent>

            <TabsContent value="2023-24" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4">2023-24 Season</h2>
                <SeasonMedia2023 />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}