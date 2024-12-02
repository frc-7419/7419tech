import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import NavHeader from "@/components/NavHeader"

export default function MediaPage() {
    const images2024 = [
      "/static/robot/DSC06883.JPG",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ]
    return (
      <div className="min-h-screen bg-white">
        <NavHeader />
        {/* Header Section */}
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold mb-2 text-[#2A336A]">Media Gallery</h1>
          <p className="text-[#F4B942] mb-8">
            Explore our robotics journey through photos and videos from various competitions
          </p>
  
          {/* Competition Tabs */}
          <Tabs defaultValue="2024" className="w-full">
            <TabsList className="bg-[#F4B942] w-full justify-start mb-8">
              <TabsTrigger
                value="2024"
                className="text-[#2A336A] data-[state=active]:bg-[#2A336A] data-[state=active]:text-[#FFFFFF]"
              >
                2024 Season
              </TabsTrigger>
              <TabsTrigger
                value="2023"
                className="text-[#2A336A] data-[state=active]:bg-[#2A336A] data-[state=active]:text-[#FFFFFF]"
              >
                2023 Season
              </TabsTrigger>
              <TabsTrigger
                value="2022"
                className="text-[#2A336A] data-[state=active]:bg-[#2A336A] data-[state=active]:text-[#FFFFFF]"
              >
                2022 Season
              </TabsTrigger>
            </TabsList>
  
            {/* 2024 Season Content */}
            <TabsContent value="2024">
              <div className="space-y-8">
                {["Champs 2024", "SVR 2024", "Build Season"].map((section, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-semibold mb-4 text-[#2A336A]">{section}</h2>
                    <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                      <div className="flex w-max space-x-4 p-4">
                        {images2024.map((path, i) => (
                          <Card key={i} className="w-[300px] bg-[#2A336A] border-none shadow-md">
                            <CardContent className="p-0">
                              <Image
                                src={path}
                                alt={`${section} Photo ${i + 1}`}
                                width={300}
                                height={200}
                                className="object-cover rounded-t-lg"
                              />
                              <div className="p-4">
                                <p className="text-sm text-gray-200">March 2024</p>
                              </div>
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
              <div className="text-center py-8">
                <p className="text-[#F4B942]">2023 Season photos coming soon...</p>
              </div>
            </TabsContent>
  
            {/* 2022 Season Content */}
            <TabsContent value="2022">
              <div className="text-center py-8">
                <p className="text-[#F4B942]">2022 Season photos coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }
  