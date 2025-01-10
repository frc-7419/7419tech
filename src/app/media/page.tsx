import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import NavHeader from "@/components/NavHeader";

// need to add more images
export default function MediaPage() {
  const champs2024 = [
    "/static/comps/champs2024/DSC06887.JPG",
    "/static/comps/champs2024/DSC06924.JPG",
    "/static/comps/champs2024/DSC06941.JPG",
    "/static/comps/champs2024/IMG_6749.JPG",
    "/static/comps/champs2024/IMG_6754.png",
  ];
  const svr2024 = [
    "/static/comps/champs2024/IMG_6749.JPG",
    "/static/comps/svr2024/image.png",
    "/static/comps/svr2024/img1.png",
    "/static/comps/svr2024/img2.png",
    "/static/comps/svr2024/img4.png",
  ];
  const ccc2024 = [
    "/static/comps/ccc2024/20241026_112449.jpg",
    "/static/comps/ccc2024/20241026_163310.jpg",
    "/static/comps/ccc2024/IMG_9638.JPG",
    "/static/comps/ccc2024/IMG_9648.JPG",
    "/static/comps/ccc2024/IMG_9707.JPG",
  ];
  return (
    <div className="min-h-screen bg-white">
      <NavHeader />
      {/* Header Section */}
      <div className="container mx-auto py-8 text-center">
        
        <h1 className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl p-3">
          Media Gallery
        </h1>
        <p className="text-gray-700 mb-8">
          Explore our robotics journey through photos and videos from various
          competitions
        </p>

        {/* Competition Tabs */}
        <Tabs defaultValue="2024" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-4 h-12 rounded-lg bg-white bg-opacity-50 shadow-lg">
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
            <TabsTrigger
              value="2022"
              className="text-lg font-semibold rounded-lg transition-all hover:bg-white"
            >
              2022-23 season
            </TabsTrigger>
          </TabsList>

          {/* 2024 Season Content */}
          {/* <TabsContent value="2024">
            <div className="space-y-8">
              {["Champs 2024", "SVR 2024", "Build Season"].map(
                (section, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-semibold mb-4 text-[#2A336A]">
                      {section}
                    </h2>
                    <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                      <div className="flex w-max space-x-4 p-4">
                        {images2024.map((path, i) => (
                          <Card
                            key={i}
                            className="w-[300px] h-[200px] bg-[#2A336A] border-none shadow-md"
                          >
                            <CardContent className="p-0">
                              <Image
                                src={path}
                                alt={`${section} Photo ${i + 1}`}
                                width={300}
                                height={100}
                                className="object-cover rounded-t-lg"
                              />

                              <div className="p-4"></div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                )
              )}
            </div>
          </TabsContent> */}

          {/*  */}
          <TabsContent value="2024">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#2A336A]">
                CCC 2024
              </h2>
              <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                <div className="flex w-max space-x-4 p-4">
                  {ccc2024.map((path, i) => (
                    <Card
                      key={i}
                      className="w-[300px] h-[200px] bg-[#2A336A] border-none shadow-md"
                    >
                      <CardContent className="p-0">
                        <Image
                          src={path}
                          alt={`Photo ${i + 1}`}
                          width={300}
                          height={100}
                          className="object-cover rounded-t-lg"
                        />

                        <div className="p-4"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </TabsContent>

          {/* 2023 Season Content */}
          <TabsContent value="2023">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#2A336A]">
                Champs 2024
              </h2>
              <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                <div className="flex w-max space-x-4 p-4">
                  {champs2024.map((path, i) => (
                    <Card
                      key={i}
                      className="w-[300px] h-[200px] bg-[#2A336A] border-none shadow-md"
                    >
                      <CardContent className="p-0">
                        <Image
                          src={path}
                          alt={`Photo ${i + 1}`}
                          width={300}
                          height={100}
                          className="object-cover rounded-t-lg"
                        />

                        <div className="p-4"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-[#2A336A]">
                SVR 2024
              </h2>
              <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                <div className="flex w-max space-x-4 p-4">
                  {svr2024.map((path, i) => (
                    <Card
                      key={i}
                      className="w-[300px] h-[200px] bg-[#2A336A] border-none shadow-md"
                    >
                      <CardContent className="p-0">
                        <Image
                          src={path}
                          alt={`Photo ${i + 1}`}
                          width={300}
                          height={100}
                          className="object-cover rounded-t-lg"
                        />

                        <div className="p-4"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <div className="text-center py-8">
              <p className="text-gray-700">2023 season photos coming soon...</p>
            </div>
          </TabsContent>

          {/* 2022 Season Content */}
          <TabsContent value="2022">
            <div className="text-center py-8">
              <p className="text-gray-700">2022 season photos coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
