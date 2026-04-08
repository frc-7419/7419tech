import { Suspense } from "react";
import { NavHeader } from "@/components/NavHeader";
import { HeroSection } from "@/components/HeroSection";
import Footer from "@/components/Footer";
import Mission from "@/components/Mission";
import Profile from "@/components/profile";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-background padding">
      <Suspense>
        <NavHeader />
        <HeroSection />
        <Mission />
        <Profile
          direction="left"
          name="The Quarry Lane School"
          description="Team 7419 consists of students from The Quarry Lane School in Dublin, CA. The team was formed in 2018 by passionate students and teachers here at our school. We've been to world champs three times and have seen tremendous growth year over year."
          logoUrl="/QuarryLaneLogo.png"
          websiteUrl="https://www.quarrylane.org/"
          backgrondColor="white"
        />

        <Profile
          direction="right"
          name="First Robotics"
          description="The Quarry Lane Schools is deeply involved with the FIRST organization. With 6 FTC and 7 FLL teams and the parent FRC team, students at Quarry Lane are passion about collaboration and embodying FIRST's values. "
          logoUrl="/FirstLogo.png?height=50&width=50"
          websiteUrl="https://www.firstinspires.org/robotics/frc"
          backgrondColor="gray-500"
        />
        <Footer />
      </Suspense>
    </main>
  );
}
