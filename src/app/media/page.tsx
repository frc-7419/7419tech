'use client'

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import NavHeader from "@/components/NavHeader";
import { strapiClient } from "@/lib/strapi/client";

// Original hardcoded media (preserved!)
const originalMedia = {
  champs2024: [
    "/static/comps/champs2024/DSC06887.JPG",
    "/static/comps/champs2024/DSC06924.JPG",
    "/static/comps/champs2024/DSC06941.JPG",
    "/static/comps/champs2024/IMG_6749.JPG",
    "/static/comps/champs2024/IMG_6754.png",
  ],
  svr2024: [
    "/static/comps/champs2024/IMG_6749.JPG",
    "/static/comps/svr2024/image.png",
    "/static/comps/svr2024/img1.png",
    "/static/comps/svr2024/img2.png",
    "/static/comps/svr2024/img4.png",
  ],
  ccc2024: [
    "/static/comps/ccc2024/20241026_112449.jpg",
    "/static/comps/ccc2024/20241026_163310.jpg",
    "/static/comps/ccc2024/IMG_9638.JPG",
    "/static/comps/ccc2024/IMG_9648.JPG",
    "/static/comps/ccc2024/IMG_9707.JPG",
  ]
}

interface StrapiMediaItem {
  id: number
  title: string
  description?: string
  media: {
    url: string
  }
  season: string
  event_name: string
  event_date?: string
  category: string
}

export default function MediaPage() {
  const [strapiMedia2024, setStrapiMedia2024] = useState<StrapiMediaItem[]>([])
  const [strapiMedia2023, setStrapiMedia2023] = useState<StrapiMediaItem[]>([])
  const [strapiLoading, setStrapiLoading] = useState(true)

  useEffect(() => {
    async function fetchMedia() {
      try {
        const [response2024, response2023] = await Promise.all([
          strapiClient.getMediaBySeason('season_2024_25'),
          strapiClient.getMediaBySeason('season_2023_24')
        ])
        setStrapiMedia2024(response2024.data)
        setStrapiMedia2023(response2023.data)
      } catch (err) {
        console.log('Strapi media not available, showing original media only')
      } finally {
        setStrapiLoading(false)
      }
    }

    fetchMedia()
  }, [])

  const groupByEvent = (items: StrapiMediaItem[]) => {
    return items.reduce((acc, item) => {
      if (!acc[item.event_name]) {
        acc[item.event_name] = []
      }
      acc[item.event_name].push(item)
      return acc
    }, {} as Record<string, StrapiMediaItem[]>)
  }
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />
      {/* Header Section */}
      <div className="container mx-auto py-8 text-center">
        
        <h1 className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl p-3 m-5">
          Media Gallery
        </h1>
        

        <Tabs defaultValue="2024" className="w-full">
          <TabsList className="grid w-full grid-cols-2 gap-4 h-12 rounded-lg bg-white bg-opacity-50 shadow-lg">
            <TabsTrigger
              value="2024"
              className="text-lg font-semibold rounded-lg transition-all hover:bg-white"
            >
              2024-25 season
            </TabsTrigger>
            <TabsTrigger
              value="2023"
              className="text-lg font-semibold rounded-lg transition-all hover:bg-white"
            >
              2023-24 season
            </TabsTrigger>
          </TabsList>

          {/* 2024 Season Content */}
          <TabsContent value="2024">
            <div className="space-y-8">
              {/* Original CCC 2024 */}
              <div>
                <h2 className="text-2xl mt-10 font-semibold mb-4 text-[#2A336A]">
                  CCC 2024
                </h2>
                <ScrollArea className="w-full whitespace-nowrap rounded-lg h-[280px]">
                  <div className="flex w-max space-x-4 p-4">
                    {originalMedia.ccc2024.map((path, i) => (
                      <Card
                        key={i}
                        className="w-[300px] h-[200px] bg-[#2A336A] border-none shadow-md"
                      >
                        <CardContent className="p-0">
                          <Image
                            src={path}
                            alt={`CCC 2024 Photo ${i + 1}`}
                            width={300}
                            height={200}
                            className="object-cover rounded-lg w-full h-full"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              {/* Strapi 2024 Media */}
              {Object.entries(groupByEvent(strapiMedia2024)).map(([eventName, items]) => (
                <div key={eventName}>
                  <h2 className="text-2xl mt-10 font-semibold mb-4 text-[#2A336A]">
                    {eventName} {strapiLoading && <span className="text-sm text-gray-500">(Loading...)</span>}
                  </h2>
                  <ScrollArea className="w-full whitespace-nowrap rounded-lg h-[280px]">
                    <div className="flex w-max space-x-4 p-4">
                      {items.map((item) => (
                        <Card
                          key={item.id}
                          className="w-[300px] h-[200px] bg-[#2A336A] border-none shadow-md"
                        >
                          <CardContent className="p-0">
                            <Image
                              src={`http://localhost:1337${item.media.url}`}
                              alt={item.title}
                              width={300}
                              height={200}
                              className="object-cover rounded-lg w-full h-full"
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* 2023 Season Content */}
          <TabsContent value="2023">
            <div className="space-y-8">
              {/* Original Champs 2024 */}
              <div>
                <h2 className="text-2xl mt-10 font-semibold mb-4 text-[#2A336A]">
                  Champs 2024
                </h2>
                <ScrollArea className="w-full whitespace-nowrap rounded-lg h-[280px]">
                  <div className="flex w-max space-x-4 p-4">
                    {originalMedia.champs2024.map((path, i) => (
                      <Card
                        key={i}
                        className="w-[300px] h-[200px] bg-[#2A336A] border-none shadow-md"
                      >
                        <CardContent className="p-0">
                          <Image
                            src={path}
                            alt={`Champs 2024 Photo ${i + 1}`}
                            width={300}
                            height={200}
                            className="object-cover rounded-lg w-full h-full"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              {/* Original SVR 2024 */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-[#2A336A]">
                  SVR 2024
                </h2>
                <ScrollArea className="w-full whitespace-nowrap rounded-lg h-[280px]">
                  <div className="flex w-max space-x-4 p-4">
                    {originalMedia.svr2024.map((path, i) => (
                      <Card
                        key={i}
                        className="w-[300px] h-[200px] bg-[#2A336A] border-none shadow-md"
                      >
                        <CardContent className="p-0">
                          <Image
                            src={path}
                            alt={`SVR 2024 Photo ${i + 1}`}
                            width={300}
                            height={200}
                            className="object-cover rounded-lg w-full h-full"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>

              {/* Strapi 2023 Media */}
              {Object.entries(groupByEvent(strapiMedia2023)).map(([eventName, items]) => (
                <div key={eventName}>
                  <h2 className="text-2xl mt-10 font-semibold mb-4 text-[#2A336A]">
                    {eventName} {strapiLoading && <span className="text-sm text-gray-500">(Loading...)</span>}
                  </h2>
                  <ScrollArea className="w-full whitespace-nowrap rounded-lg h-[280px]">
                    <div className="flex w-max space-x-4 p-4">
                      {items.map((item) => (
                        <Card
                          key={item.id}
                          className="w-[300px] h-[200px] bg-[#2A336A] border-none shadow-md"
                        >
                          <CardContent className="p-0">
                            <Image
                              src={`http://localhost:1337${item.media.url}`}
                              alt={item.title}
                              width={300}
                              height={200}
                              className="object-cover rounded-lg w-full h-full"
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
