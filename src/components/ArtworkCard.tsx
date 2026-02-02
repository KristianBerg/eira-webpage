import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { colors } from '../theme/colors'

interface ArtworkCardProps {
  title: string
  images: string[]
  description?: string
  price?: string
}

const Card = styled.article`
  max-width: 400px;
`

const ImageArea = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.backgroundMuted};
  border-radius: 8px;
`

const NavButton = styled.button`
  flex-shrink: 0;
  width: 36px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${colors.textSecondary};
  padding: 0;

  &:hover {
    color: ${colors.textPrimary};
  }
`

const NavPlaceholder = styled.div`
  width: 36px;
  flex-shrink: 0;
`

const ImageContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  cursor: pointer;
`

const ImageCounter = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: ${colors.overlay};
  color: ${colors.overlayText};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`

const Content = styled.div`
  padding: 16px 0;
`

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
`

const Description = styled.p`
  color: ${colors.textSecondary};
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 8px;
`

const Price = styled.div`
  font-size: 18px;
  font-weight: 600;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const LightboxContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 90vw;
  max-height: 90vh;
`

const LightboxImage = styled.img`
  max-width: 80vw;
  max-height: 85vh;
  object-fit: contain;
  animation: zoomIn 0.25s ease-out;

  @keyframes zoomIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: ${colors.overlayText};
  font-size: 32px;
  cursor: pointer;
  padding: 8px;
  line-height: 1;

  &:hover {
    opacity: 0.8;
  }
`

const LightboxNavButton = styled.button`
  background: none;
  border: none;
  color: ${colors.overlayText};
  font-size: 48px;
  cursor: pointer;
  padding: 20px;
  flex-shrink: 0;

  &:hover {
    opacity: 0.8;
  }
`

const LightboxNavPlaceholder = styled.div`
  width: 88px;
  flex-shrink: 0;
`

export function ArtworkCard({ title, images, description, price }: ArtworkCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const hasMultipleImages = images.length > 1

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  const openLightbox = useCallback(() => {
    setIsZoomed(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setIsZoomed(false)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    if (!isZoomed) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        goToPrevious()
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomed, hasMultipleImages, goToPrevious, goToNext, closeLightbox])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <Card>
        <ImageArea>
          {hasMultipleImages ? (
            <NavButton onClick={goToPrevious}>&#8249;</NavButton>
          ) : (
            <NavPlaceholder />
          )}
          <ImageContainer>
            <Image src={images[currentIndex]} alt={title} onClick={openLightbox} />
            {hasMultipleImages && (
              <ImageCounter>
                {currentIndex + 1} / {images.length}
              </ImageCounter>
            )}
          </ImageContainer>
          {hasMultipleImages ? (
            <NavButton onClick={goToNext}>&#8250;</NavButton>
          ) : (
            <NavPlaceholder />
          )}
        </ImageArea>
        <Content>
          <Title>{title}</Title>
          {description && <Description>{description}</Description>}
          {price && <Price>{price}</Price>}
        </Content>
      </Card>

      {isZoomed && (
        <Overlay onClick={closeLightbox}>
          <CloseButton onClick={closeLightbox}>&times;</CloseButton>
          <LightboxContent onClick={e => e.stopPropagation()}>
            {hasMultipleImages ? (
              <LightboxNavButton onClick={goToPrevious}>&#8249;</LightboxNavButton>
            ) : (
              <LightboxNavPlaceholder />
            )}
            <LightboxImage src={images[currentIndex]} alt={title} />
            {hasMultipleImages ? (
              <LightboxNavButton onClick={goToNext}>&#8250;</LightboxNavButton>
            ) : (
              <LightboxNavPlaceholder />
            )}
          </LightboxContent>
        </Overlay>
      )}
    </>
  )
}
