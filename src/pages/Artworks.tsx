import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ArtworkCard } from '../components/ArtworkCard'

interface Artwork {
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

export function Artworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([])

  useEffect(() => {
    fetch('/content/artworks.json')
      .then(res => res.json())
      .then(data => setArtworks(data.artworks))
      .catch(err => console.error('Failed to load artworks:', err))
  }, [])

  return (
    <div>
      <Title>Artworks</Title>
      <Gallery>
        {artworks.map(artwork => (
          <ArtworkCard
            key={artwork.title}
            title={artwork.title}
            images={artwork.images}
            description={artwork.description}
            price={artwork.price}
          />
        ))}
      </Gallery>
    </div>
  )
}
