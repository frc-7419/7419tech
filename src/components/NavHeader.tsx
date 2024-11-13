'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Card, CardContent } from "@/components/ui/card"

const NavLink = ({ href, title, description }: { href: string, title: string, description: string }) => (
  <NavigationMenuLink asChild>
    <Link href={href}>
      <Card className="cursor-pointer hover:bg-accent">
        <CardContent className="p-4">
          <div className="text-sm font-semibold mb-1">{title}</div>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  </NavigationMenuLink>
);

export function NavHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[#11224e] shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between"> 
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity" aria-label="Home">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-[#ffb41a] mr-3">Team</span>
            <Image 
              width="75" 
              height="75" 
              src="/Logo.png" 
              alt="7419 Logo"
              className="rounded-full" 
            />
          </div>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white hover:bg-[#1a2f5e] focus:bg-[#1a2f5e]">
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[600px] p-4 md:grid-cols-2 lg:w-[600px]">
                    <div className="grid gap-3 md:grid-cols-2">
                    <NavLink 
                      href="/team" 
                      title="Our Team" 
                      description="Meet the passionate students behind our robotics team." 
                    />
                    <NavLink 
                      href="/mentors" 
                      title="Mentors" 
                      description="Learn about the experienced professionals guiding our team." 
                    />
                    <NavLink 
                      href="/robot" 
                      title="Our Robot" 
                      description="Explore our robot design through an interactive page." 
                    />
                    <NavLink 
                      href="/outreach" 
                      title="Community Outreach" 
                      description="Discover how we're making an impact in our local community." 
                    />
                    </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/media" passHref>
                <Button variant="ghost" className="text-white hover:bg-[#1a2f5e] focus:bg-[#1a2f5e]">
                  Media
                </Button>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/sponsors" passHref>
                <Button variant="ghost" className="text-white hover:bg-[#1a2f5e] focus:bg-[#1a2f5e]">
                  Sponsors
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}