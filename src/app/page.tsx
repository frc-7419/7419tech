import { PageShell } from "@/components/PageShell"
import { HeroSection } from "@/components/HeroSection"
import { FirstGrid, HomeIntro, SeasonBand, SocialSection } from "@/components/home/HomeSections"

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <HomeIntro />
      <SeasonBand />
      <FirstGrid />
      <SocialSection />
    </PageShell>
  )
}
