'use client'

import React, { useState } from 'react'
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
import { useAuth } from '@/contexts/AuthContext'
import { LogIn, LogOut, Settings, Loader2, Menu, X } from 'lucide-react'

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

export function AuthNavHeader() {
  const { user, profile, isAdmin, isLoading, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#11224e] shadow-lg">
      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-200" aria-label="Home">
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
                    Discover how we&apos;re making an impact to younger generations and the community.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/media" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent text-white hover:bg-[#1a2f5e] focus:bg-[#1a2f5e] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold))] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4">
                  Media
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/sponsors" legacyBehavior passHref>
                <NavigationMenuLink className="bg-transparent text-white hover:bg-[#1a2f5e] focus:bg-[#1a2f5e] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold))] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4">
                  Sponsors
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            {/* Admin Dashboard Link - only show for admins */}
            {isAdmin && (
              <NavigationMenuItem>
                <Link href="/admin" legacyBehavior passHref>
                  <NavigationMenuLink className="bg-transparent text-white hover:bg-[#1a2f5e] focus:bg-[#1a2f5e] inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold))] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-2">
          {isLoading ? (
            // Show loading spinner while auth is being determined
            <div className="w-20 h-8 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-white/70" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-2">
              <span className="text-white text-sm">
                {profile?.name || user.email}
              </span>
              <Button 
                onClick={signOut}
                variant="outline" 
                size="sm"
                className="text-white border-white hover:bg-white hover:text-[#11224e]"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/contact" passHref>
                <Button className="bg-[hsl(var(--brand-gold))] text-[#1a2f5e] hover:bg-[#ffc14a] font-semibold mr-2">
                  Contact Us
                </Button>
              </Link>
              <Link href="/auth/login" passHref>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-white border-white hover:bg-white hover:text-[#11224e]"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-full bg-[#0f1b3a] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
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
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-white/50">About</p>
              <Link href="/team" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>Our Team</Link>
              <Link href="/robot" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>Our Robot</Link>
              <Link href="/mentors" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>Mentors</Link>
              <Link href="/leadership" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>Leadership</Link>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-white/50">Resources</p>
              <Link href="/blog" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>Team Blog</Link>
              <Link href="/outreach" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>Outreach</Link>
            </div>

            <div className="space-y-3">
              <Link href="/media" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>Media</Link>
              <Link href="/sponsors" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>Sponsors</Link>
              {isAdmin && (
                <Link href="/admin" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>Admin</Link>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              {isLoading ? (
                <div className="flex items-center gap-2 text-white/70">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Checking account…</span>
                </div>
              ) : user ? (
                <>
                  <span className="block text-sm text-white/70">{profile?.name || user.email}</span>
                  <button
                    className="w-full rounded-md border border-white/40 px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#11224e]"
                    onClick={() => {
                      signOut()
                      setMobileOpen(false)
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/contact" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>
                    Contact Us
                  </Link>
                  <Link href="/auth/login" className="block text-white hover:text-[hsl(var(--brand-gold))]" onClick={() => setMobileOpen(false)}>
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthNavHeader
