import { Button } from "./ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trophy, Link, Users, Mail } from "lucide-react"

export default function Mentors() {
    <section className="bg-background">
        <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl">Mission and Vision Statement</h2>
            <p className="text-lg text-muted-foreground mb-8">
                Team 7419 QLS Tech Support strives to instill technical expertise and collaboration into every member on our
                student-led team. We are a supportive and dedicated family that works together to give back to the community
                with the technical and interpersonal skills gained through the FIRST Robotics Competition program. With every
                day of hard work, we are becoming the leaders of tomorrow.
            </p>
            <Button variant="outline" size="lg" className="rounded-full">
                Learn More About Our Values
            </Button>
            </div>
        </div>
    </section>

    {/* Info Cards */}
    <section className="bg-muted/50 py-16 md:py-24">
        <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
            <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                <Trophy className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Our Robot</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="mb-4">Explore our robot&apos;s features through an intuitive, interactive diagram.</p>
                <Button variant="secondary" asChild className="w-full">
                    <Link href="/achievements">View Trophies</Link>
                </Button>
                </CardContent>
            </Card>
            <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                <Users className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Get Involved</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="mb-4">Whether you&apos;re a student, mentor, or sponsor, there are many ways to support our mission.</p>
                <Button variant="secondary" asChild className="w-full">
                    <Link href="/support">Join Us</Link>
                </Button>
                </CardContent>
            </Card>
            {/* <Card className="transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                <Mail className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Stay Updated</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="mb-4">Subscribe to our newsletter for the latest news, events, and team updates.</p>
                <form onSubmit={handleNewsletterSignup} className="flex gap-2">
                    <Input type="email" placeholder="Enter your email" required />
                    <Button type="submit">Subscribe</Button>
                </form>
                </CardContent>
            </Card> */}
            </div>
        </div>
    </section>

}