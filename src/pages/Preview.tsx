import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSettings } from '../context/SettingsContext'
import { PageWrapper, Container, Nav, Main, Footer, FooterTitle, FooterLink } from '../components/Layout'
import { Artworks } from './Artworks'
import { AboutEira } from './AboutEira'

const FONTS = [
  'Playfair Display',
  'Cormorant Garamond',
  'Libre Baskerville',
  'Lora',
  'Inter',
  'Raleway',
  'Work Sans',
]

const COLOR_FIELDS = [
  { key: 'textPrimary', label: 'Text Primary', cssVar: '--color-text-primary' },
  { key: 'textSecondary', label: 'Text Secondary', cssVar: '--color-text-secondary' },
  { key: 'background', label: 'Background', cssVar: '--color-background' },
  { key: 'backgroundOuter', label: 'Background Outer', cssVar: '--color-background-outer' },
  { key: 'backgroundNav', label: 'Background Nav', cssVar: '--color-background-nav' },
  { key: 'backgroundMuted', label: 'Background Muted', cssVar: '--color-background-muted' },
] as const

type ColorKey = typeof COLOR_FIELDS[number]['key']

const PreviewLayout = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`

const Sidebar = styled.div`
  width: 300px;
  min-width: 300px;
  padding: 24px;
  background: #1e1e1e;
  color: #e0e0e0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const SidebarTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  font-family: system-ui, sans-serif;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Label = styled.label`
  font-size: 12px;
  color: #aaa;
  font-family: system-ui, sans-serif;
`

const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const ColorInput = styled.input`
  width: 40px;
  height: 30px;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;
  background: none;
`

const HexValue = styled.span`
  font-size: 13px;
  font-family: monospace;
  color: #ccc;
`

const Select = styled.select`
  padding: 6px 8px;
  border: 1px solid #555;
  border-radius: 4px;
  background: #2a2a2a;
  color: #e0e0e0;
  font-size: 14px;
  font-family: system-ui, sans-serif;
`

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`

const Button = styled.button`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #555;
  border-radius: 4px;
  background: #2a2a2a;
  color: #e0e0e0;
  font-size: 13px;
  cursor: pointer;
  font-family: system-ui, sans-serif;

  &:hover {
    background: #3a3a3a;
  }
`

const ToggleRow = styled.div`
  display: flex;
  border: 1px solid #555;
  border-radius: 4px;
  overflow: hidden;
`

const ToggleButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 6px 12px;
  border: none;
  background: ${p => p.$active ? '#4a4a4a' : '#2a2a2a'};
  color: #e0e0e0;
  font-size: 13px;
  cursor: pointer;
  font-family: system-ui, sans-serif;

  &:hover {
    background: ${p => p.$active ? '#4a4a4a' : '#3a3a3a'};
  }
`

const PreviewArea = styled.div`
  flex: 1;
  overflow-y: auto;
`

const PreviewNavSpan = styled.span`
  text-decoration: none;
  color: var(--color-text-primary);
  font-size: 18px;
  cursor: default;

  &:hover {
    color: var(--color-text-secondary);
  }
`

export function Preview() {
  const settings = useSettings()
  const [previewColors, setPreviewColors] = useState<Record<ColorKey, string>>(settings.colors)
  const [previewFont, setPreviewFont] = useState(settings.font)
  const [view, setView] = useState<'artworks' | 'about'>('artworks')

  // Re-initialize when settings load from server
  useEffect(() => {
    setPreviewColors(settings.colors)
    setPreviewFont(settings.font)
  }, [settings])

  // Load the preview font
  useEffect(() => {
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${previewFont.replace(/ /g, '+')}:wght@400;600;700&display=swap`
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [previewFont])

  function handleColorChange(key: ColorKey, value: string) {
    setPreviewColors(prev => ({ ...prev, [key]: value }))
  }

  function handleReset() {
    setPreviewColors(settings.colors)
    setPreviewFont(settings.font)
  }

  function handleCopyJson() {
    const json = JSON.stringify({ font: previewFont, colors: previewColors }, null, 2)
    navigator.clipboard.writeText(json)
  }

  const cssVarStyle: Record<string, string> = {
    fontFamily: `"${previewFont}", system-ui, sans-serif`,
  }
  for (const field of COLOR_FIELDS) {
    cssVarStyle[field.cssVar] = previewColors[field.key]
  }

  return (
    <PreviewLayout>
      <Sidebar>
        <SidebarTitle>Color Scheme Preview</SidebarTitle>

        {COLOR_FIELDS.map(field => (
          <FieldGroup key={field.key}>
            <Label>{field.label}</Label>
            <ColorRow>
              <ColorInput
                type="color"
                value={previewColors[field.key]}
                onChange={e => handleColorChange(field.key, e.target.value)}
              />
              <HexValue>{previewColors[field.key]}</HexValue>
            </ColorRow>
          </FieldGroup>
        ))}

        <FieldGroup>
          <Label>Font</Label>
          <Select value={previewFont} onChange={e => setPreviewFont(e.target.value)}>
            {FONTS.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup>
          <Label>View</Label>
          <ToggleRow>
            <ToggleButton $active={view === 'artworks'} onClick={() => setView('artworks')}>
              Artworks
            </ToggleButton>
            <ToggleButton $active={view === 'about'} onClick={() => setView('about')}>
              About
            </ToggleButton>
          </ToggleRow>
        </FieldGroup>

        <ButtonRow>
          <Button onClick={handleCopyJson}>Copy JSON</Button>
          <Button onClick={handleReset}>Reset</Button>
        </ButtonRow>
      </Sidebar>

      <PreviewArea>
        <div style={cssVarStyle}>
          <PageWrapper>
            <Container>
              <Nav>
                <PreviewNavSpan>Artworks</PreviewNavSpan>
                <PreviewNavSpan>About Eira</PreviewNavSpan>
              </Nav>
              <Main>
                {view === 'artworks' ? <Artworks /> : <AboutEira />}
              </Main>
              <Footer>
                <FooterTitle>Contact details</FooterTitle>
                <div>Eira</div>
                <FooterLink href="#">eira@example.com</FooterLink>
                <FooterLink href="#">@eira</FooterLink>
              </Footer>
            </Container>
          </PageWrapper>
        </div>
      </PreviewArea>
    </PreviewLayout>
  )
}
