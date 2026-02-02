import styled from 'styled-components'
import { colors } from '../theme/colors'

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
`

const Placeholder = styled.p`
  color: ${colors.textSecondary};
`

export function AboutEira() {
  return (
    <div>
      <Title>About Eira</Title>
      <Placeholder>Bio coming soon...</Placeholder>
    </div>
  )
}
