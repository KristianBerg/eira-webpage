import styled from 'styled-components'
import { colors } from '../theme/colors'

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
`

export function AboutEira() {
  return (
    <Container>
      <ProfileImage src="/profile.svg" alt="Eira" />
      <Title>About Eira</Title>
      <Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Description>
      <Description>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Description>
    </Container>
  )
}
