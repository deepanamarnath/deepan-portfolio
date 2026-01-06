
import { Settings, Code, Bug, User, Brain, Rocket, Zap, Database } from "lucide-react";

export const PROFILE = {
    name: "Deepan Amarnath",
    title: "Technical Solutions Architect | AI & Automation Lead",
    tagline: "I bridge the gap between Business Vision and Intelligent Execution.",
    bio: "Specializing in building Custom AI Agents, No-Code Solutions, and Automated Quality Assurance to drive digital transformation.",
    quote: "Building the future of work with Human Ingenuity + Artificial Intelligence.",
    email: "deepanamarnath.nagaraj@gmail.com",
    phone: "97 89 15 34 11",
    socials: {
        linkedin: "https://www.linkedin.com/in/deepan-amarnath/",
        github: "https://github.com/deepan-amarnath" // Placeholder based on likely username
    }
};

export const SERVICES = [
    {
        title: "Business Analysis & Strategy",
        description: "Assessment & Roadmap, Requirements Engineering, Process Optimization.",
        icon: Brain,
        category: "Analyze & Strategy"
    },
    {
        title: "Custom AI Agents",
        description: "RAG & LLM Workflows, Chatbot Orchestration, Agentic Workflows.",
        icon: User,
        category: "AI & Agents"
    },
    {
        title: "Modern Web Apps",
        description: "Rapid Prototyping, Integrated Systems, React & No-Code Solutions.",
        icon: Code,
        category: "Build (No-Code)"
    },
    {
        title: "Automation & QA",
        description: "Selenium Automation, End-to-End Testing, Quality Assurance.",
        icon: Zap,
        category: "Automate & QA"
    }
];

export const SKILLS = [
    {
        category: "AI & Agentic Workflows",
        items: ["OpenAI", "LangChain", "Flowise", "Automation"]
    },
    {
        category: "Development & No-Code",
        items: ["React", "NoCode", "JavaScript"]
    },
    {
        category: "Quality & Tools",
        items: ["Selenium", "Python", "Jira"]
    }
];

export const PROJECTS = [
    {
        title: "Enterprise AI Agent",
        description: "A comprehensive AI agent orchestrator for enterprise workflows.",
        tags: ["LangChain", "OpenAI", "React"],
        category: "AI_AGENT",
        image: "/assets/project-1.png"
    },
    {
        title: "Automated QA Suite",
        description: "End-to-End testing framework utilizing Selenium and Python.",
        tags: ["Selenium", "Python", "Automation"],
        category: "TEST_AUTOMATION",
        image: "/assets/project-2.png"
    },
    {
        title: "No-Code CRM",
        description: "Rapidly deployed CRM solution for small businesses.",
        tags: ["NoCode", "Integration"],
        category: "AUTOMATION",
        image: "/assets/project-3.png"
    }
];
