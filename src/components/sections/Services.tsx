"use client"

import { motion } from "framer-motion"
import { SERVICES } from "@/constants/data"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"

export function Services() {
    return (
        <section id="expertise" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold">
                        What I Do
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Combining business vision with technical execution to deliver AI-driven value.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full bg-card/50 backdrop-blur border-primary/10 hover:border-primary/50 transition-colors">
                                    <CardHeader className="space-y-4">
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                            {Icon && <Icon className="h-6 w-6 text-primary" />}
                                        </div>
                                        <CardTitle className="text-xl">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base text-muted-foreground">
                                            {service.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
