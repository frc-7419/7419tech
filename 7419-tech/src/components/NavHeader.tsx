'use client'
import Link from 'next/link'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu'
import Image from 'next/image'

export function NavHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[#11224e]">
      <div className="flex h-16 items-center justify-between px-10"> 
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
          <span className="text-2xl font-bold text-[#ffb41a] mr-3">FRC</span>
            <Image width="75" height="75" src="/Logo.png" alt={'7419 Logo'} />
          </div>
        </Link>
        <NavigationMenu className="">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/team"
                      >
                        <div className="text-sm font-medium leading-none">Our Team</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Meet the passionate students behind our robotics team.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/mentors"
                      >
                        <div className="text-sm font-medium leading-none">Mentors</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn about the experienced professionals guiding our team.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/achievements"
                      >
                        <div className="text-sm font-medium leading-none">Our robot</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Explore our robot design through an interactive page.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/outreach"
                      >
                        <div className="text-sm font-medium leading-none">Community Outreach</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Discover how we're making an impact in our local community.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/media" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Media
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/sponsors" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Sponsors
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
}