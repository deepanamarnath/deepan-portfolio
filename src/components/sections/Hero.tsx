"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"
import { PROFILE } from "@/constants/data"

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-50" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] opacity-50" />
            </div>

            <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 shadow-[0_0_15px_-3px_rgba(var(--primary),0.3)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Available for New Projects
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        Hi there, I'm <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-purple-400 animate-gradient-x bg-[length:200%_auto]">
                            {PROFILE.name}
                        </span>
                        <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
                    </h1>

                    <h2 className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
                        {PROFILE.title}
                    </h2>

                    <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                        {PROFILE.tagline}
                        <br />
                        {PROFILE.bio}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="gap-2" asChild>
                            <Link href="#contact">
                                Let's Connect <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2" asChild>
                            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4" /> Download Resume
                            </Link>
                        </Button>
                    </div>

                    <div className="flex items-center gap-6 mt-12 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CodeIcon className="h-4 w-4 text-primary" />
                            <span>AI Architect</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>Automation Lead</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>3+ Years Exp.</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative lg:h-[600px] flex items-center justify-center"
                >
                    {/* Abstract Tech Visual */}
                    <div className="relative w-full aspect-square max-w-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-full opacity-20 blur-3xl animate-pulse" />
                        <div className="relative z-10 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                            <div className="space-y-6">
                                <div className="h-2 w-1/3 bg-white/10 rounded" />
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-white/10 rounded" />
                                    <div className="h-2 w-5/6 bg-white/10 rounded" />
                                    <div className="h-2 w-4/6 bg-white/10 rounded" />
                                </div>
                                {/* Code snippet mock */}
                                <div className="p-4 bg-black/40 rounded-lg font-mono text-xs text-green-400">
                                    <p>{`> Initializing AI Agent...`}</p>
                                    <p>{`> Connecting to LLM...`}</p>
                                    <p>{`> Optimizing Workflow...`}</p>
                                    <p className="animate-pulse">{`> Ready.`}</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating badges */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 bg-card border p-4 rounded-xl shadow-lg"
                        >
                            <BrainIcon className="h-8 w-8 text-primary mb-2" />
                            <div className="text-xs font-bold">AI Native</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 bg-card border p-4 rounded-xl shadow-lg"
                        >
                            <RocketIcon className="h-8 w-8 text-blue-500 mb-2" />
                            <div className="text-xs font-bold">Scalable</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function CodeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    )
}

function BrainIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
            <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
            <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
            <path d="M6 18a4 4 0 0 1-1.97-3.284" />
            <path d="M17.97 14.716A4 4 0 0 1 16 18" />
        </svg>
    )
}

function RocketIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    )
}
