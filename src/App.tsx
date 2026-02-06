import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Artworks } from './pages/Artworks'
import { AboutEira } from './pages/AboutEira'
import { Preview } from './pages/Preview'
import { SettingsProvider } from './context/SettingsContext'

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/preview" element={<Preview />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Artworks />} />
            <Route path="/about" element={<AboutEira />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  )
}

export default App
