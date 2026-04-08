'use client'

import React, { useEffect, useState } from 'react'
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
import { LogIn, LogOut, Settings, User as UserIcon, Shield, Loader2, Menu, X } from 'lucide-react'

type ListItemProps = React.ComponentPropsWithoutRef<typeof Link> & {
  title: string
  className?: string
  children: React.ReactNode
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
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
  const [mobileOpen, setMobileOpen] = useState(false)
  
  // Check if we're on an auth, dashboard, or admin page
  const isSpecialPage = pathname?.startsWith('/auth') || pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')
  
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header className="fixed top-3 left-0 right-0 mx-auto z-50 w-[95%] max-w-6xl">
      <div className={cn(
        "backdrop-blur-md rounded-2xl shadow-2xl border flex h-14 md:h-16 items-center justify-between px-4 md:px-6 transition-all duration-500",
        isSpecialPage 
          ? "bg-gradient-to-r from-[#1b2947] via-[#2a3f6b] to-[#1b2947] border-[hsl(var(--brand-gold))]/30 shadow-[hsl(var(--brand-gold))]/20" 
          : "bg-gray-800/30 border-gray-400/20"
      )}>
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-200 no-underline" aria-label="Home">
          <div className="flex items-center">
            <span className="text-2xl md:text-3xl font-bold text-[hsl(var(--brand-gold))] mr-3">Team</span>
            <Image 
              width="48" 
              height="48" 
              src="/Logo.png" 
              alt="7419 Logo"
              className="h-9 w-9 md:h-12 md:w-12 rounded-full transition-transform duration-200 hover:scale-105" 
            />
          </div>
        </Link>

        <NavigationMenu className="hidden md:flex">
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

        <div className="hidden md:flex items-center gap-2">
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

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-opacity",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 w-full max-w-full bg-[#0f1b3a] shadow-2xl flex flex-col",
            "transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Image
                src="/Logo.png"
                alt="7419 Logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-lg font-semibold text-white">Menu</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-white/50">About</p>
              <Link href="/team" className="block text-white hover:text-[hsl(var(--brand-gold))]">Our Team</Link>
              <Link href="/robot" className="block text-white hover:text-[hsl(var(--brand-gold))]">Our Robot</Link>
              <Link href="/mentors" className="block text-white hover:text-[hsl(var(--brand-gold))]">Mentors</Link>
              <Link href="/leadership" className="block text-white hover:text-[hsl(var(--brand-gold))]">Leadership</Link>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-white/50">Resources</p>
              <Link href="/blog" className="block text-white hover:text-[hsl(var(--brand-gold))]">Team Blog</Link>
              <Link href="/outreach" className="block text-white hover:text-[hsl(var(--brand-gold))]">Outreach</Link>
            </div>

            <div className="space-y-3">
              <Link href="/media" className="block text-white hover:text-[hsl(var(--brand-gold))]">Media</Link>
              <Link href="/sponsors" className="block text-white hover:text-[hsl(var(--brand-gold))]">Sponsors</Link>
              <Link href="/contact" className="block text-white hover:text-[hsl(var(--brand-gold))]">Contact Us</Link>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              {isLoading ? (
                <div className="flex items-center gap-2 text-white/70">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Checking account…</span>
                </div>
              ) : user ? (
                <>
                  <Link href="/dashboard" className="block text-white hover:text-[hsl(var(--brand-gold))]">Member Dashboard</Link>
                  {isAdmin && (
                    <Link href="/admin" className="block text-white hover:text-[hsl(var(--brand-gold))]">Admin Dashboard</Link>
                  )}
                  <Button
                    variant="outline"
                    className="w-full border-white/40 text-white bg-transparent hover:bg-white hover:text-[#11224e]"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="w-full bg-[hsl(var(--brand-gold))] text-[#1a2f5e] hover:bg-[#ffc14a]">
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-white/40 text-white bg-transparent hover:bg-white hover:text-[#11224e]">
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavHeader
