
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Sparkles } from "lucide-react";
import { generateResponse, ChatMessage } from "@/lib/chatLogic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            role: "bot",
            text: "Hi! I'm Deepan's AI Assistant. Ask me anything about his projects, skills, or experience!",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: "user",
            text: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");

        // Simulate typing delay
        setTimeout(() => {
            const botResponseText = generateResponse(userMsg.text);
            const botMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                text: botResponseText,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 600);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    // Simple formatter for bold text and newlines
    const renderMessageText = (text: string) => {
        return text.split("\n").map((line, i) => (
            <span key={i} className="block min-h-[1.2em]">
                {line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                        return <strong key={j} className="text-primary font-bold">{part.slice(2, -2)}</strong>;
                    }
                    // Basic link parsing [label](url)
                    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (linkMatch) {
                        return (
                            <a
                                key={j}
                                href={linkMatch[2]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline hover:text-blue-400"
                            >
                                {linkMatch[1]}
                            </a>
                        );
                    }
                    return part;
                })}
            </span>
        ));
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] shadow-2xl rounded-2xl overflow-hidden"
                    >
                        <Card className="border-0 shadow-lg h-[500px] flex flex-col backdrop-blur-md bg-background/95 border-primary/10 ring-1 ring-white/10">
                            <CardHeader className="p-4 border-b bg-muted/30 flex flex-row items-center justify-between space-y-0">
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-green-500 blur-[6px] opacity-70 animate-pulse rounded-full"></div>
                                        <Avatar className="h-10 w-10 border-2 border-background relative z-10">
                                            <AvatarImage src="/assets/profile-pic.png" alt="Bot" />
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div>
                                        <CardTitle className="text-md font-bold">Deepan's Assistant</CardTitle>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <span className="block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            Online
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full hover:bg-muted/50">
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>

                            <CardContent className="p-0 flex-1 overflow-hidden relative">
                                {/* Optional background decoration */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />

                                <ScrollArea className="h-full p-4">
                                    <div className="flex flex-col gap-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                                            >
                                                {msg.role === "bot" && (
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                                        <Sparkles className="h-4 w-4 text-primary" />
                                                    </div>
                                                )}
                                                {msg.role === "user" && (
                                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                                        <User className="h-4 w-4 text-foreground" />
                                                    </div>
                                                )}

                                                <div
                                                    className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-sm shadow-sm ${msg.role === "user"
                                                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                            : "bg-muted/50 border border-border/50 text-foreground rounded-tl-sm backdrop-blur-sm"
                                                        }`}
                                                >
                                                    {renderMessageText(msg.text)}
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </ScrollArea>
                            </CardContent>

                            <CardFooter className="p-3 bg-muted/20 border-t gap-2">
                                <Input
                                    placeholder="Ask about skills, projects, contact..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 bg-background/50 border-white/10 focus-visible:ring-primary/30"
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    size="icon"
                                    className="shrink-0 rounded-full shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="fixed bottom-6 right-6 z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 border-2 border-white/20 p-0"
                >
                    {isOpen ? <X className="h-7 w-7 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
                </Button>
            </motion.div>
        </>
    );
}
