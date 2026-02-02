import { Outlet, Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../theme/colors'

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: ${colors.backgroundOuter};
`

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.background};
`

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  padding: 20px 40px;
  background: ${colors.backgroundNav};
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${colors.textPrimary};
  font-size: 18px;

  &:hover {
    color: ${colors.textSecondary};
  }
`

const Main = styled.main`
  flex: 1;
  padding: 40px;
`

export function Layout() {
  return (
    <PageWrapper>
      <Container>
        <Nav>
          <NavLink to="/">Artworks</NavLink>
          <NavLink to="/about">About Eira</NavLink>
        </Nav>
        <Main>
          <Outlet />
        </Main>
      </Container>
    </PageWrapper>
  )
}
