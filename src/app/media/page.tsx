'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageShell } from "@/components/PageShell";
import { SeasonMedia2025, SeasonMedia2024, SeasonMedia2023 } from "@/components/DynamicMedia";
import { PagePhotoHeader } from "@/components/ui/page-photo-header";

export default function MediaPage() {
  return (
    <PageShell>
      <PagePhotoHeader
        photo="/static/outreach/ftc-match.jpg"
        eyebrow="Our Journey"
        title="Media Gallery"
        description="Explore our journey through competitions, outreach events, and team moments across different seasons."
        compact
      />
      <div className="bg-[#122350] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="2025-26" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-12 bg-white/10">
              <TabsTrigger value="2025-26" className="font-display text-sm font-semibold uppercase tracking-wide data-[state=active]:bg-[hsl(var(--brand-gold))] data-[state=active]:text-[#122350]">2025-26 Season</TabsTrigger>
              <TabsTrigger value="2024-25" className="font-display text-sm font-semibold uppercase tracking-wide data-[state=active]:bg-[hsl(var(--brand-gold))] data-[state=active]:text-[#122350]">2024-25 Season</TabsTrigger>
              <TabsTrigger value="2023-24" className="font-display text-sm font-semibold uppercase tracking-wide data-[state=active]:bg-[hsl(var(--brand-gold))] data-[state=active]:text-[#122350]">2023-24 Season</TabsTrigger>
            </TabsList>

            <TabsContent value="2025-26" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4 text-white">2025-26 Season</h2>
                <SeasonMedia2025 />
              </div>
            </TabsContent>

            <TabsContent value="2024-25" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4 text-white">2024-25 Season</h2>
                <SeasonMedia2024 />
              </div>
            </TabsContent>

            <TabsContent value="2023-24" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-semibold mb-4 text-white">2023-24 Season</h2>
                <SeasonMedia2023 />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageShell>
  )
}
