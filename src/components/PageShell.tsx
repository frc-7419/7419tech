import { NavHeader } from "@/components/NavHeader"
import Footer from "@/components/Footer"

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavHeader />
      {/* Each page/section owns its own top offset (pt-24) below the fixed nav, since
          full-bleed heroes need to start flush at the top of the viewport. */}
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
