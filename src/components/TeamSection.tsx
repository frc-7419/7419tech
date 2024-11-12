import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";


export default function TeamSection() {
    {/* Feature Carousel */}
    return (
        <section className="bg-muted py-16 md:py-24">
        <div className="container">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Why Choose FRC 7419?</h2>
            <Tabs defaultValue="innovation" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="innovation">Innovation</TabsTrigger>
                <TabsTrigger value="teamwork">Teamwork</TabsTrigger>
                <TabsTrigger value="impact">Community Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="innovation" className="mt-8">
                <Card>
                <CardHeader>
                    <CardTitle>Cutting-edge Robotics</CardTitle>
                    <CardDescription>Pushing the boundaries of technology</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Our team develops innovative solutions using the latest in robotics technology, preparing students for the challenges of tomorrow.</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline">Learn More</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="teamwork" className="mt-8">
                <Card>
                <CardHeader>
                    <CardTitle>Collaborative Spirit</CardTitle>
                    <CardDescription>Building strong bonds and lifelong skills</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>We foster a supportive environment where students learn the value of teamwork, communication, and leadership.</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline">Join Us</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="impact" className="mt-8">
                <Card>
                <CardHeader>
                    <CardTitle>Giving Back</CardTitle>
                    <CardDescription>Making a difference in our community</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Through outreach programs and STEM education initiatives, we're inspiring the next generation of innovators and problem-solvers.</p>
                </CardContent>
                <CardFooter>
                    <Button variant="outline">Our Initiatives</Button>
                </CardFooter>
                </Card>
            </TabsContent>
            </Tabs>
            
        </div>
        </section>
    )
}