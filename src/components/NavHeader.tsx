'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function NavHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#11224e] shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-200" aria-label="Home">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-[#ffb41a] mr-3">Team</span>
            <Image 
              width="48" 
              height="48" 
              src="/Logo.png" 
              alt="7419 Logo"
              className="rounded-full transition-transform duration-200 hover:scale-105" 
            />
          </div>
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white hover:bg-[#1a2f5e] focus:bg-[rgb(26,47,94)] hover:text-white focus:text-white">About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem href="/team" title="Our Team">
                    Meet the passionate students behind our robotics team.
                  </ListItem>
                  <ListItem href="/robot" title="Our Robot">
                    Explore our robot design through an interactive page.
                  </ListItem>
                  <ListItem href="/mentors" title="Mentors">
                    Learn about the experienced professionals guiding our team.
                  </ListItem>
                  <ListItem href="/leadership" title="Leadership">
                    Learn about our experienced students leading our different departments.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-white hover:bg-[#1a2f5e] focus:bg-[rgb(26,47,94)] hover:text-white focus:text-white">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem href="/blog" title="Team Blog">
                      Read about our latest achievements and ongoing projects.
                    </ListItem>
                  <ListItem href="/outreach" title="Outreach">
                    Discover how we're making an impact to younger generations and the community.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/media" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent text-white hover:bg-[#1a2f5e] focus:bg-[#1a2f5e] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffb41a] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4">
                  Media
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/sponsors" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent text-white hover:bg-[#1a2f5e] focus:bg-[#1a2f5e] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffb41a] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4">
                  Sponsors
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Link href="/contact" passHref>
          <Button className="bg-[#ffb41a] text-[#1a2f5e] hover:bg-[#ffc14a] font-semibold">
            Contact Us
          </Button>
        </Link>
      </div>
    </header>
  )
}

export default NavHeader
