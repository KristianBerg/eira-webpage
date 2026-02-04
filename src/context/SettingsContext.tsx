import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface Colors {
  textPrimary: string
  textSecondary: string
  background: string
  backgroundOuter: string
  backgroundNav: string
  backgroundMuted: string
}

interface Settings {
  font: string
  colors: Colors
}

const defaultSettings: Settings = {
  font: 'Playfair Display',
  colors: {
    textPrimary: '#333333',
    textSecondary: '#666666',
    background: '#ffffff',
    backgroundOuter: '#e8e4e0',
    backgroundNav: '#f5f5f5',
    backgroundMuted: '#f0f0f0'
  }
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

  useEffect(() => {
    const root = document.documentElement
    const { colors } = settings
    root.style.setProperty('--color-text-primary', colors.textPrimary)
    root.style.setProperty('--color-text-secondary', colors.textSecondary)
    root.style.setProperty('--color-background', colors.background)
    root.style.setProperty('--color-background-outer', colors.backgroundOuter)
    root.style.setProperty('--color-background-nav', colors.backgroundNav)
    root.style.setProperty('--color-background-muted', colors.backgroundMuted)
  }, [settings.colors])

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}
