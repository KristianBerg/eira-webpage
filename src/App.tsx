import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Artworks } from './pages/Artworks'
import { AboutEira } from './pages/AboutEira'

function App() {
  return (
    <BrowserRouter basename="/eira-webpage">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Artworks />} />
          <Route path="/about" element={<AboutEira />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
