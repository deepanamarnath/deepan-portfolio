"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"
import { PROFILE } from "@/constants/data"

export function Contact() {
    return (
        <section id="contact" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold">Let's Connect</h2>
                        <p className="text-muted-foreground text-lg">
                            Building the future of work with Human Ingenuity + Artificial Intelligence.
                            <br /><br />
                            Ready to start a project or just want to discuss the latest in AI? Reach out.
                        </p>

                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" asChild>
                                <Link href={PROFILE.socials.github} target="_blank" rel="noopener noreferrer" aria-label="Github">
                                    <Github className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <Link href={PROFILE.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <Linkedin className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <Link href={`mailto:${PROFILE.email}`} aria-label="Email">
                                    <Mail className="h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <Link href={`https://wa.me/${PROFILE.phone.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                    <MessageCircle className="h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                            <CardDescription>
                                I'll get back to you within 24 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Input placeholder="Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Input placeholder="Email" type="email" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Input placeholder="Subject" />
                                </div>
                                <div className="space-y-2">
                                    <Textarea placeholder="How can I help you?" className="min-h-[120px]" />
                                </div>
                                <Button type="submit" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
