import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'

interface AboutData {
  title: string
  description: string
  photo: string
}

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const ProfileImage = styled.img`
  display: block;
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin: 0 auto 24px;
`

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
`

const Description = styled.p`
  color: ${colors.textSecondary};
  font-size: 16px;
  line-height: 1.7;
  white-space: pre-line;
`

export function AboutEira() {
  const [about, setAbout] = useState<AboutData | null>(null)

  useEffect(() => {
    fetch('/content/about.json')
      .then(res => res.json())
      .then(setAbout)
  }, [])

  if (!about) return null

  return (
    <Container>
      <ProfileImage src={about.photo} alt={about.title} />
      <Title>{about.title}</Title>
      <Description>{about.description}</Description>
    </Container>
  )
}
