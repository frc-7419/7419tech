'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useAuth } from '@/contexts/AuthContext'
import { LogIn, LogOut, Settings, User as UserIcon, Shield, Loader2 } from 'lucide-react'

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
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
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function NavHeader() {
  const pathname = usePathname()
  const { user, isAdmin, isLoading, signOut } = useAuth()
  
  // Check if we're on an auth, dashboard, or admin page
  const isSpecialPage = pathname?.startsWith('/auth') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className={cn(
        "backdrop-blur-md rounded-2xl shadow-2xl border flex h-16 items-center justify-between px-6 transition-all duration-500",
        isSpecialPage 
          ? "bg-gradient-to-r from-[#1b2947] via-[#2a3f6b] to-[#1b2947] border-[hsl(var(--brand-gold))]/30 shadow-[hsl(var(--brand-gold))]/20" 
          : "bg-gray-800/30 border-gray-400/20"
      )}>
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-200 no-underline" aria-label="Home">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-[hsl(var(--brand-gold))] mr-3">Team</span>
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
              <NavigationMenuTrigger className={cn(
                "bg-transparent text-white hover:text-white focus:text-white transition-all duration-300",
                isSpecialPage 
                  ? "hover:bg-[hsl(var(--brand-gold))]/20 focus:bg-[hsl(var(--brand-gold))]/20 hover:text-[hsl(var(--brand-gold))] focus:text-[hsl(var(--brand-gold))]"
                  : "hover:bg-[#1a2f5e] focus:bg-[rgb(26,47,94)]"
              )}>About</NavigationMenuTrigger>
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
              <NavigationMenuTrigger className={cn(
                "bg-transparent text-white hover:text-white focus:text-white transition-all duration-300",
                isSpecialPage 
                  ? "hover:bg-[hsl(var(--brand-gold))]/20 focus:bg-[hsl(var(--brand-gold))]/20 hover:text-[hsl(var(--brand-gold))] focus:text-[hsl(var(--brand-gold))]"
                  : "hover:bg-[#1a2f5e] focus:bg-[rgb(26,47,94)]"
              )}>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem href="/blog" title="Team Blog">
                      Read about our latest achievements and ongoing projects.
                    </ListItem>
                  <ListItem href="/outreach" title="Outreach">
                    Discover how we&apos;re making an impact to younger generations and the community.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/media" className={cn(
                  "bg-transparent text-white inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold))] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 no-underline hover:no-underline",
                  isSpecialPage 
                    ? "hover:bg-[hsl(var(--brand-gold))]/20 focus:bg-[hsl(var(--brand-gold))]/20 hover:text-[hsl(var(--brand-gold))] focus:text-[hsl(var(--brand-gold))]"
                    : "hover:bg-[#1a2f5e] focus:bg-[#1a2f5e]"
                )}>
                  Media
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/sponsors" className={cn(
                  "bg-transparent text-white inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold))] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 no-underline hover:no-underline",
                  isSpecialPage 
                    ? "hover:bg-[hsl(var(--brand-gold))]/20 focus:bg-[hsl(var(--brand-gold))]/20 hover:text-[hsl(var(--brand-gold))] focus:text-[hsl(var(--brand-gold))]"
                    : "hover:bg-[#1a2f5e] focus:bg-[#1a2f5e]"
                )}>
                  Sponsors
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button asChild className={cn(
            "font-semibold transition-all duration-300",
            isSpecialPage 
              ? "bg-[hsl(var(--brand-gold))] text-[#1a2f5e] hover:bg-[hsl(var(--brand-gold))]/90 hover:shadow-[hsl(var(--brand-gold))]/50 hover:shadow-lg"
              : "bg-[hsl(var(--brand-gold))] text-[#1a2f5e] hover:bg-[#ffc14a]"
          )}>
            <Link href="/contact" className="no-underline hover:no-underline">
              Contact Us
            </Link>
          </Button>
          
          {/* Auth buttons with proper loading state */}
          {isLoading ? (
            // Show loading spinner while auth is being determined
            <div className="w-10 h-10 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-white/70" />
            </div>
          ) : user ? (
            // User is logged in - show profile dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="text-white border-white hover:bg-white hover:text-[#11224e] bg-transparent">
                  <UserIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Member Dashboard
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={signOut} 
                  className="flex items-center text-red-600 cursor-pointer"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // User is not logged in - show sign in/sign up buttons
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className={cn(
                "text-white bg-transparent transition-all duration-300",
                isSpecialPage 
                  ? "hover:bg-[hsl(var(--brand-gold))]/20 hover:text-[hsl(var(--brand-gold))] border border-transparent hover:border-[hsl(var(--brand-gold))]/30"
                  : "hover:bg-[#1a2f5e] hover:text-white"
              )}>
                <Link href="/auth/signup" className="no-underline hover:no-underline">
                  Sign Up
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className={cn(
                "text-white bg-transparent transition-all duration-300",
                isSpecialPage 
                  ? "border-[hsl(var(--brand-gold))]/50 hover:bg-[hsl(var(--brand-gold))] hover:text-[#1a2f5e] hover:shadow-[hsl(var(--brand-gold))]/30 hover:shadow-lg"
                  : "border-white hover:bg-white hover:text-[#11224e]"
              )}>
                <Link href="/auth/login" className="no-underline hover:no-underline">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavHeader
