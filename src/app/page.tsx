// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { Button } from "@/components/ui/button"
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { useToast } from "@/hooks/use-toast"
// import { X, ChevronRight, Mail, Calendar, Trophy, Users } from "lucide-react"

// export default function Component() {
//   const [showBanner, setShowBanner] = useState(true)
//   const [timeLeft, setTimeLeft] = useState('')
//   const { toast } = useToast()

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date()
//       const competitionDate = new Date('2025-03-15T09:00:00') // Example date
//       const difference = competitionDate.getTime() - now.getTime()

//       const days = Math.floor(difference / (1000 * 60 * 60 * 24))
//       const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
//       const minutes = Math.floor((difference / 1000 / 60) % 60)
//       const seconds = Math.floor((difference / 1000) % 60)

//       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Announcement Banner */}
//       {showBanner && (
//         <div className="bg-primary px-4 py-3 text-primary-foreground">
//           <div className="container flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-medium">
//                 Join us at the upcoming robotics competition!
//               </span>
//             </div>
//             <div className="flex items-center gap-4">
//               <Button variant="secondary" size="sm" asChild>
//                 <Link href="/register">Register Now</Link>
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setShowBanner(false)}
//                 className="text-primary-foreground"
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Navigation */}
//       <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <Link href="/" className="flex items-center gap-2">
//             <span className="text-2xl font-bold">FRC 7419</span>
//           </Link>
//           <NavigationMenu>
//             <NavigationMenuList>
              // <NavigationMenuItem>
              //   <NavigationMenuTrigger>About</NavigationMenuTrigger>
              //   <NavigationMenuContent>
              //     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              //       <li>
              //         <NavigationMenuLink asChild>
              //           <Link
              //             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              //             href="/team"
              //           >
              //             <div className="text-sm font-medium leading-none">Our Team</div>
              //             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              //               Meet the passionate students behind our robotics team.
              //             </p>
              //           </Link>
              //         </NavigationMenuLink>
              //       </li>
              //       <li>
              //         <NavigationMenuLink asChild>
              //           <Link
              //             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              //             href="/mentors"
              //           >
              //             <div className="text-sm font-medium leading-none">Mentors</div>
              //             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              //               Learn about the experienced professionals guiding our team.
              //             </p>
              //           </Link>
              //         </NavigationMenuLink>
              //       </li>
              //       <li>
              //         <NavigationMenuLink asChild>
              //           <Link
              //             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              //             href="/achievements"
              //           >
              //             <div className="text-sm font-medium leading-none">Achievements</div>
              //             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              //               Explore our team's accomplishments and awards.
              //             </p>
              //           </Link>
              //         </NavigationMenuLink>
              //       </li>
              //       <li>
              //         <NavigationMenuLink asChild>
              //           <Link
              //             className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              //             href="/outreach"
              //           >
              //             <div className="text-sm font-medium leading-none">Community Outreach</div>
              //             <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              //               Discover how we're making an impact in our local community.
              //             </p>
              //           </Link>
              //         </NavigationMenuLink>
              //       </li>
              //     </ul>
              //   </NavigationMenuContent>
              // </NavigationMenuItem>
              // <NavigationMenuItem>
              //   <Link href="/media" legacyBehavior passHref>
              //     <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
              //       Media
              //     </NavigationMenuLink>
              //   </Link>
              // </NavigationMenuItem>
              // <NavigationMenuItem>
              //   <Link href="/sponsors" legacyBehavior passHref>
              //     <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
              //       Sponsors
              //     </NavigationMenuLink>
              //   </Link>
              // </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>
//           <Button asChild>
//             <Link href="/blog">Team Blog →</Link>
//           </Button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative overflow-hidden">
//         <video
//           autoPlay
//           loop
//           muted
//           className="absolute inset-0 h-full w-full object-cover opacity-30"
//         >
//           <source src="/placeholder.mp4" type="video/mp4" />
//         </video>
//         <div className="relative container py-24 md:py-32">
//           <div className="grid gap-8 lg:grid-cols-2">
//             <div className="flex flex-col justify-center space-y-8">
//               <div className="space-y-6">
//                 <h1 className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:text-6xl xl:text-7xl">
//                   QLS Tech Support
//                 </h1>
//                 <p className="max-w-[600px] text-xl text-gray-500 dark:text-gray-400 md:text-2xl">
//                   Building tomorrow's leaders through robotics, innovation, and teamwork.
//                 </p>
//               </div>
//               <div className="flex flex-col gap-4 sm:flex-row">
//                 <Button size="lg" asChild className="rounded-full">
//                   <Link href="/join">Join Our Team</Link>
//                 </Button>
//                 <Button size="lg" variant="outline" asChild className="rounded-full">
//                   <Link href="/competitions">View Competitions</Link>
//                 </Button>
//               </div>
//             </div>
//             <div className="hidden lg:block">
//               <Card className="w-full h-full bg-background/80 backdrop-blur">
//                 <CardHeader>
//                   <CardTitle>Next Competition Countdown</CardTitle>
//                   <CardDescription>Mark your calendars and get ready!</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-4xl font-bold text-primary">{timeLeft}</div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="outline" className="w-full">
//                     <Calendar className="mr-2 h-4 w-4" /> Add to Calendar
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Carousel */}
//       <section className="bg-muted py-16 md:py-24">
//         <div className="container">
//           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Why Choose FRC 7419?</h2>
//           <Tabs defaultValue="innovation" className="w-full">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="innovation">Innovation</TabsTrigger>
//               <TabsTrigger value="teamwork">Teamwork</TabsTrigger>
//               <TabsTrigger value="impact">Community Impact</TabsTrigger>
//             </TabsList>
//             <TabsContent value="innovation" className="mt-8">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Cutting-edge Robotics</CardTitle>
//                   <CardDescription>Pushing the boundaries of technology</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Our team develops innovative solutions using the latest in robotics technology, preparing students for the challenges of tomorrow.</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="outline">Learn More</Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
//             <TabsContent value="teamwork" className="mt-8">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Collaborative Spirit</CardTitle>
//                   <CardDescription>Building strong bonds and lifelong skills</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p>We foster a supportive environment where students learn the value of teamwork, communication, and leadership.</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="outline">Join Us</Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
//             <TabsContent value="impact" className="mt-8">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Giving Back</CardTitle>
//                   <CardDescription>Making a difference in our community</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <p>Through outreach programs and STEM education initiatives, we're inspiring the next generation of innovators and problem-solvers.</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="outline">Our Initiatives</Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </section>

//       {/* Info Cards */}
//       <section className="bg-muted/50 py-16 md:py-24">
//         <div className="container">
//           <div className="grid gap-8 md:grid-cols-3">
//             <Card className="transition-all duration-300 hover:shadow-lg">
//               <CardHeader>
//                 <Trophy className="h-8 w-8 mb-2 text-primary" />
//                 <CardTitle>Our Robot</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="mb-4">Explore our robot's features through an intuitive, interactive diagram.</p>
//                 <Button variant="secondary" asChild className="w-full">
//                   <Link href="/achievements">View Trophies</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//             <Card className="transition-all duration-300 hover:shadow-lg">
//               <CardHeader>
//                 <Users className="h-8 w-8 mb-2 text-primary" />
//                 <CardTitle>Get Involved</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="mb-4">Whether you're a student, mentor, or sponsor, there are many ways to support our mission.</p>
//                 <Button variant="secondary" asChild className="w-full">
//                   <Link href="/support">Join Us</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//             <Card className="transition-all duration-300 hover:shadow-lg">
//               <CardHeader>
//                 <Mail className="h-8 w-8 mb-2 text-primary" />
//                 <CardTitle>Stay Updated</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="mb-4">Subscribe to our newsletter for the latest news, events, and team updates.</p>
//                 <form onSubmit={handleNewsletterSignup} className="flex gap-2">
//                   <Input type="email" placeholder="Enter your email" required />
//                   <Button type="submit">Subscribe</Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       
//   )
// }

import { Suspense } from 'react'
import { NavHeader } from '@/components/NavHeader'
import { HeroSection } from '@/components/HeroSection'
//import { AnnouncementBanner } from '@/components/AnnouncementBanner'
import Footer from '@/components/Footer'
import Mission from '@/components/Mission'
import Profile from '@/components/profile'
//import Mission  from '@/components/Mission'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background padding">
      <Suspense>
        <NavHeader />
        <HeroSection />
        <Mission />
        <Profile
        direction="left"
        name="Bellarmine College Preparatory"
        description="Team 254 consists of students from Bellarmine College Preparatory in San Jose, CA. The team was founded by NASA Ames Research Center in the fall of 1998 at Broadway High School and moved to Bellarmine in the fall of 2000."
        logoUrl="/QuarryLaneLogo.png"
        websiteUrl="#"
        backgrondColor='white'
      />
      
      {/* Right-facing logo section */}
      <Profile
        direction="right"
        name="Bellarmine College Preparatory"
        description="Team 254 consists of students from Bellarmine College Preparatory in San Jose, CA. The team was founded by NASA Ames Research Center in the fall of 1998 at Broadway High School and moved to Bellarmine in the fall of 2000."
        logoUrl="/FirstLogo.png?height=50&width=50"
        websiteUrl="#"
        backgrondColor='gray-500'
      />
        <Footer />
        
      </Suspense>
    </main>
  )
}