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
import { LogIn, LogOut, Settings, User as UserIcon, Shield, Loader2, Instagram } from 'lucide-react'

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
          <div className="font-display text-sm font-semibold uppercase tracking-wide leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

// Every nav control is h-10; horizontal padding tightens below xl so the bar never overflows.
const navItemBase =
  "nav-underline h-10 bg-transparent px-3 font-display text-sm font-semibold uppercase tracking-wide text-white xl:px-4"
const navTriggerClass = cn(
  navItemBase,
  "hover:bg-transparent hover:text-[hsl(var(--brand-gold))] focus:bg-transparent focus:text-[hsl(var(--brand-gold))] data-[state=open]:bg-transparent data-[state=open]:text-[hsl(var(--brand-gold))] data-[active]:bg-transparent"
)
const navLinkClass = cn(
  navItemBase,
  "inline-flex items-center justify-center no-underline transition-colors hover:text-[hsl(var(--brand-gold))] hover:no-underline"
)
const outlineOnNavy = "h-10 border-white/30 bg-transparent text-white hover:bg-white hover:text-[#122350]"
const ABOUT_PATHS = ["/team", "/robot", "/outreach", "/mentors", "/leadership"]
const MEDIA_PATHS = ["/blog", "/media"]

export function NavHeader() {
  const pathname = usePathname()
  const { user, isAdmin, isLoading, signOut } = useAuth()

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#122350]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 no-underline" aria-label="7419 QLS Tech Support home">
          <Image width={72} height={44} src="/Logo.png" alt="" priority className="h-11 w-auto" style={{ width: "auto" }} />
          <span className="hidden whitespace-nowrap font-display text-xl font-bold uppercase tracking-wide text-white xl:inline">
            Team <span className="text-[hsl(var(--brand-gold))]">7419</span>
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-center">
          <NavigationMenu className="flex-none">
            <NavigationMenuList className="gap-1 xl:gap-2">
              <NavigationMenuItem>
                <NavigationMenuTrigger data-active={ABOUT_PATHS.some(isActive)} className={navTriggerClass}>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <ListItem href="/team" title="Our Team">
                      Meet the passionate students behind our robotics team.
                    </ListItem>
                    <ListItem href="/robot" title="Our Robot">
                      See how we designed, built, and programmed our 2026 robot.
                    </ListItem>
                    <ListItem href="/outreach" title="Outreach">
                      Discover how we&apos;re making an impact on younger generations and the community.
                    </ListItem>
                    <ListItem href="/mentors" title="Mentors">
                      Learn about the experienced professionals guiding our team.
                    </ListItem>
                    <ListItem href="/leadership" title="Leadership">
                      Meet the students leading each part of the team.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger data-active={MEDIA_PATHS.some(isActive)} className={navTriggerClass}>Media</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <ListItem href="/blog" title="Team Blog">
                      Read about our latest achievements and ongoing projects.
                    </ListItem>
                    <ListItem href="/media" title="Photos & Videos">
                      Browse match footage, build season photos, and event highlights.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/sponsors" data-active={isActive('/sponsors')} className={navLinkClass}>
                    Sponsors
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex shrink-0 items-center gap-2 lg:gap-4">
          <div aria-hidden className="hidden h-6 w-px bg-white/15 lg:block" />

          <div className="flex items-center gap-2 lg:gap-3">
            <a
              href="https://www.instagram.com/7419tech/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="7419 on Instagram"
              className="hidden h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-[hsl(var(--brand-gold))] xl:inline-flex"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <Button
              asChild
              className="h-10 bg-[hsl(var(--brand-gold))] px-4 font-display font-semibold uppercase tracking-wide text-[#122350] hover:bg-[hsl(var(--brand-gold))]/90 lg:px-5"
            >
              <Link href="/contact" className="no-underline hover:no-underline">
                Contact Us
              </Link>
            </Button>

            {isLoading ? (
              <div className="flex h-10 w-10 items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-white/70" />
              </div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Account menu" className={outlineOnNavy}>
                    <UserIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Member Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex cursor-pointer items-center text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  className="hidden h-10 px-3 text-white hover:bg-white/10 hover:text-white xl:inline-flex"
                >
                  <Link href="/auth/signup" className="no-underline hover:no-underline">
                    Sign Up
                  </Link>
                </Button>
                <Button asChild variant="outline" className={cn(outlineOnNavy, "px-3")}>
                  <Link href="/auth/login" aria-label="Sign in" className="no-underline hover:no-underline">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden xl:inline">Sign In</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavHeader
