import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface Settings {
  font: string
}

const defaultSettings: Settings = {
  font: 'Playfair Display'
}

const SettingsContext = createContext<Settings>(defaultSettings)

export function useSettings() {
  return useContext(SettingsContext)
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    fetch('/content/settings.json')
      .then(res => res.json())
      .then(setSettings)
  }, [])

  useEffect(() => {
    const font = settings.font
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@400;600;700&display=swap`
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    document.body.style.fontFamily = `"${font}", system-ui, sans-serif`

    return () => {
      document.head.removeChild(link)
    }
  }, [settings.font])

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}
