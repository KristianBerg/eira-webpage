import { Outlet, Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../theme/colors'

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: ${colors.backgroundOuter};
`

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${colors.background};
`

export const Nav = styled.nav`
  display: flex;
  gap: 24px;
  padding: 20px 40px;
  background: ${colors.backgroundNav};
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: ${colors.textPrimary};
  font-size: 18px;

  &:hover {
    color: ${colors.textSecondary};
  }
`

export const Main = styled.main`
  flex: 1;
  padding: 40px;
`

export const Footer = styled.footer`
  padding: 24px 40px;
  background: ${colors.backgroundMuted};
  text-align: center;
  color: ${colors.textSecondary};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FooterLink = styled.a`
  color: ${colors.textSecondary};
  text-decoration: none;

  &:hover {
    color: ${colors.textPrimary};
  }
`

export const FooterTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textPrimary};
  margin-bottom: 4px;
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
        <Footer>
          <FooterTitle>Contact details</FooterTitle>
          <div>Eira</div>
          <FooterLink href="mailto:eira@example.com">eira@example.com</FooterLink>
          <FooterLink href="https://instagram.com/eira" target="_blank" rel="noopener noreferrer">
            @eira
          </FooterLink>
        </Footer>
      </Container>
    </PageWrapper>
  )
}
