import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ArtworkCard } from '../components/ArtworkCard'

interface Print {
  title: string
  images: string[]
  description?: string
  price?: string
}

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
`

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
`

export function Prints() {
  const [prints, setPrints] = useState<Print[]>([])

  useEffect(() => {
    fetch('/content/prints.json')
      .then(res => res.json())
      .then(data => setPrints(data.prints))
      .catch(err => console.error('Failed to load prints:', err))
  }, [])

  return (
    <div>
      <Title>Prints</Title>
      <Gallery>
        {prints.map(print => (
          <ArtworkCard
            key={print.title}
            title={print.title}
            images={print.images}
            description={print.description}
            price={print.price}
          />
        ))}
      </Gallery>
    </div>
  )
}
