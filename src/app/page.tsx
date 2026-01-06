import { Navbar } from "@/components/layout/Navbar"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Skills />
      <Projects />
      <Contact />

      <footer className="py-8 bg-black text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Deepan Amarnath. All rights reserved.</p>
      </footer>
    </main>
  )
}
