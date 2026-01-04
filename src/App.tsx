import { Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { Home } from './pages/Home'
import { BlogList } from './pages/BlogList'
import { BlogPost } from './pages/BlogPost'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Routes>
      <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}

export default App
