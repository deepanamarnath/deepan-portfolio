"use client"

import { motion } from "framer-motion"
import { SKILLS } from "@/constants/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function Skills() {
    return (
        <section id="skills" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                    Technical Arsenal
                </h2>

                <Tabs defaultValue={SKILLS[0].category} className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
                        {SKILLS.map((skill) => (
                            <TabsTrigger
                                key={skill.category}
                                value={skill.category}
                                className="py-3 text-lg"
                            >
                                {skill.category}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {SKILLS.map((skill) => (
                        <TabsContent key={skill.category} value={skill.category} className="mt-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                            >
                                {skill.items.map((item, i) => (
                                    <div
                                        key={item}
                                        className="flex items-center justify-center p-6 bg-card rounded-xl border hover:border-primary/50 transition-colors shadow-sm"
                                    >
                                        <span className="font-semibold text-lg">{item}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}
