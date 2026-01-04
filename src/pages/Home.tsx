import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Skills } from '../components/Skills'
import { Projects } from '../components/Projects'
import { LatestBlog } from '../components/LatestBlog'
import { Contact } from '../components/Contact'
import { Footer } from '../components/Footer'
import { Background } from '../components/ui/Background'

interface HomeProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export function Home({ theme, toggleTheme }: HomeProps) {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Background />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <LatestBlog />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
