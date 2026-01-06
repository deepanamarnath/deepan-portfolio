
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Loader2, Copy, Sparkles, Zap, Shield, Bug, Search } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { motion, AnimatePresence } from "framer-motion"

// Example prompts for quick start
const EXAMPLE_PROMPTS = [
    "Test a Login Page with Google OAuth and 2FA",
    "Validate Credit Card payment flow with failure scenarios",
    "Check File Upload feature for security vulnerabilities",
    "Verify 'Forgot Password' email trigger and token expiry"
]

export default function QAToolsPage() {
    const [input, setInput] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [testCases, setTestCases] = React.useState<any[]>([])
    const [error, setError] = React.useState("")
    const [loadingText, setLoadingText] = React.useState("Initializing AI...")

    // Cycle through loading texts to make it feel alive
    React.useEffect(() => {
        if (!isLoading) return;
        const texts = ["Analyzing Requirements...", "Identifying Edge Cases...", "Checking Security Loopholes...", "Formatting Test Cases..."];
        let i = 0;
        const interval = setInterval(() => {
            setLoadingText(texts[i % texts.length]);
            i++;
        }, 800);
        return () => clearInterval(interval);
    }, [isLoading]);

    const resultsRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (testCases.length > 0 && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }, [testCases])

    const handleGenerate = async () => {
        if (!input.trim()) return

        setIsLoading(true)
        setError("")
        setTestCases([])

        try {
            const { generateTestCases } = await import("./actions")
            const response = await generateTestCases(input)

            if (response.error) {
                setError(response.error)
            } else {
                setTestCases(response)
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const copyToClipboard = () => {
        const text = testCases.map(tc => `${tc.id} | ${tc.scenario} | ${tc.type} | ${tc.expected}`).join("\n");
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden text-foreground selection:bg-primary/20">
            <Navbar />

            {/* Background Decor */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 py-24 relative z-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-secondary text-xs font-medium text-secondary-foreground mb-4">
                        <Sparkles className="h-3 w-3" /> Powered by Gemini 1.5 Flash
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        AI <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">QA Studio</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Say goodbye to manual test case writing. Describe your feature, and let
                        our AI Architect generate comprehensive scenarios covering <span className="text-foreground font-medium">Positive</span>, <span className="text-foreground font-medium">Negative</span>, and <span className="text-foreground font-medium">Security</span> flows.
                    </p>
                </motion.div>

                {/* Input Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="max-w-4xl mx-auto mb-16 border-primary/20 shadow-2xl bg-card/50 backdrop-blur-xl relative overflow-hidden group">

                        {/* Animated Border Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="p-1">
                            <div className="bg-background/80 rounded-lg p-6 md:p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        <Search className="h-4 w-4" /> Feature Description
                                    </label>
                                    <Textarea
                                        placeholder="Describe what you want to test... (e.g., 'A referral system where users get $10 for inviting friends')"
                                        className="min-h-[160px] text-lg p-6 bg-secondary/30 border-secondary focus:border-primary/50 resize-none rounded-xl leading-relaxed shadow-inner"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                </div>

                                {/* Quick Actions Plls */}
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs text-muted-foreground self-center mr-2">Try examples:</span>
                                    {EXAMPLE_PROMPTS.map((prompt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setInput(prompt)}
                                            className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/20 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button
                                        size="lg"
                                        onClick={handleGenerate}
                                        disabled={isLoading || !input}
                                        className="w-full sm:w-auto font-semibold text-md h-12 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-primary/25"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                <span className="animate-pulse">{loadingText}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <Zap className="mr-2 h-5 w-5 fill-current" /> Generate Scenarios
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {error && (
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 animate-in slide-in-from-top-2">
                                        <Bug className="h-5 w-5" /> {error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Output Section */}
                <AnimatePresence>
                    {testCases.length > 0 && (
                        <motion.div
                            ref={resultsRef}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="max-w-6xl mx-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold flex items-center gap-3">
                                    <Shield className="h-8 w-8 text-green-500" />
                                    <span>Test Coverage Report</span>
                                    <span className="text-sm font-normal text-muted-foreground bg-secondary px-3 py-1 rounded-full">{testCases.length} Scenarios Generated</span>
                                </h2>
                                <Button variant="outline" size="sm" onClick={copyToClipboard} className="hover:bg-primary hover:text-primary-foreground">
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy Report
                                </Button>
                            </div>

                            <div className="rounded-xl border bg-card/50 backdrop-blur shadow-2xl overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                                            <TableHead className="w-[100px] font-bold">ID</TableHead>
                                            <TableHead className="font-bold">Scenario Description</TableHead>
                                            <TableHead className="w-[150px] font-bold">Type</TableHead>
                                            <TableHead className="font-bold">Expected Result</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {testCases.map((tc, index) => (
                                            <motion.tr
                                                key={tc.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="group hover:bg-muted/30 transition-colors border-b border-border/50 last:border-0"
                                            >
                                                <TableCell className="font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors">{tc.id}</TableCell>
                                                <TableCell className="text-base font-medium text-foreground/90">{tc.scenario}</TableCell>
                                                <TableCell>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tc.type?.toLowerCase().includes('positive') ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        tc.type?.toLowerCase().includes('negative') ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                            tc.type?.toLowerCase().includes('security') ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                                'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                        }`}>
                                                        {tc.type}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground text-sm italic">{tc.expected}</TableCell>
                                            </motion.tr>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
