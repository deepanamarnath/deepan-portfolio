
import { PROFILE, SERVICES, SKILLS, PROJECTS } from "@/constants/data";

export interface ChatMessage {
    id: string;
    role: 'user' | 'bot';
    text: string;
    timestamp: Date;
}

const GREETINGS = ['hi', 'hello', 'hey', 'greetings', 'vanakkam', 'macha', 'dude'];
const PROFILE_KEYWORDS = ['who are you', 'about', 'introduction', 'bio', 'yourself', 'profile'];
const SKILL_KEYWORDS = ['skills', 'stack', 'technologies', 'what do you know', 'languages', 'tools'];
const PROJECT_KEYWORDS = ['projects', 'work', 'casestudies', 'portfolio', 'built', 'creations'];
const SERVICE_KEYWORDS = ['services', 'offer', 'help', 'consulting', 'what can you do'];
const CONTACT_KEYWORDS = ['contact', 'email', 'phone', 'reach', 'social', 'linkedin', 'github'];

export const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    // Check for greetings
    if (GREETINGS.some(greet => lowerInput.includes(greet))) {
        return `Hello! I'm ${PROFILE.name.split(' ')[0]}'s AI assistant. Ask me anything about his skills, projects, or how to contact him!`;
    }

    // Check for "Who are you"
    if (PROFILE_KEYWORDS.some(k => lowerInput.includes(k))) {
        return `${PROFILE.name} is a ${PROFILE.title}. \n\n${PROFILE.bio}\n\n"${PROFILE.quote}"`;
    }

    // Check for Skills - Be smart about formatting
    if (SKILL_KEYWORDS.some(k => lowerInput.includes(k))) {
        let response = "Here are my core technical skills:\n\n";
        SKILLS.forEach(category => {
            response += `**${category.category}**: ${category.items.join(', ')}\n`;
        });
        return response;
    }

    // Check for Projects
    if (PROJECT_KEYWORDS.some(k => lowerInput.includes(k))) {
        let response = "Here are some featured projects:\n\n";
        PROJECTS.slice(0, 3).forEach(project => {
            response += `**${project.title}**: ${project.description} (Tags: ${project.tags.join(', ')})\n`;
        });
        return response;
    }

    // Check for Services
    if (SERVICE_KEYWORDS.some(k => lowerInput.includes(k))) {
        let response = "I specialize in these areas:\n\n";
        SERVICES.forEach(service => {
            response += `• **${service.title}**: ${service.description}\n`;
        });
        return response;
    }

    // Check for Contact
    if (CONTACT_KEYWORDS.some(k => lowerInput.includes(k))) {
        return `You can reach Deepan at:\n• Email: ${PROFILE.email}\n• Phone: ${PROFILE.phone}\n• [LinkedIn](${PROFILE.socials.linkedin})\n• [GitHub](${PROFILE.socials.github})`;
    }

    // Default fallback
    return "I can tell you about Deepan's **skills**, **projects**, **services**, or **contact** details. Try asking: 'What skills does Deepan have?' or 'Show me his projects'.";
};
