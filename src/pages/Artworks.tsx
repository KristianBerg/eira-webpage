import styled from 'styled-components'
import { ArtworkCard } from '../components/ArtworkCard'

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
`

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
`

// Placeholder images for testing - replace with real artwork images
const exampleArtworks = [
  {
    title: 'Mountain Sunrise',
    images: [
      'https://picsum.photos/seed/art1a/800/600',
      'https://picsum.photos/seed/art1b/800/600',
      'https://picsum.photos/seed/art1c/800/600',
    ],
    description: 'Oil on canvas, 60x80cm',
    price: '2 500 kr',
  },
  {
    title: 'Abstract Dreams',
    images: ['https://picsum.photos/seed/art2/600/600'],
    description: 'Acrylic on canvas, 40x40cm',
  },
  {
    title: 'Forest Path',
    images: [
      'https://picsum.photos/seed/art3a/800/1000',
      'https://picsum.photos/seed/art3b/800/1000',
    ],
    price: '1 800 kr',
  },
]

export function Artworks() {
  return (
    <div>
      <Title>Artworks</Title>
      <Gallery>
        {exampleArtworks.map(artwork => (
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
