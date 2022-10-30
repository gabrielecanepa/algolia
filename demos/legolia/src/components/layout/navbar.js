import styled from 'styled-components'
import { Bag, Heart, Legolia } from '@/assets/icons'
import { Container, Link } from 'components'
import { SearchBox } from 'components/search'

const BaseNavbar = styled.header`
  background-color: ${({ theme }) => theme.colors.yellow};
  height: 4.6875rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const FlexContainer = styled(Container)`
  display: flex;
  align-items: center;
`

const NavbarLeft = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`

const Logo = styled(props => (
  <Link to="/" {...props} title="Legolia">
    <Legolia />
  </Link>
))`
  margin-right: 4.0625rem;

  svg {
    width: 3.4375rem;
    display: flex;
  }
`

const Menu = styled(({ items = ['Shop', 'Discover', 'Help'], ...props }) => (
  <ul {...props}>
    {items.map(item => (
      <li key={item}>
        <Link to="/">{item}</Link>
      </li>
    ))}
  </ul>
))`
  height: 3.4375rem;
  display: flex;
  align-items: center;

  li {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-right: 3.125rem;
  }
  a {
    text-transform: uppercase;
    color: rgb(0, 0, 0);
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.1875rem;
    border-bottom: 3px solid transparent;

    &:hover {
      text-decoration: none;
      border-bottom-color: var(--fg);
    }
  }
`

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`

const Actions = styled(props => (
  <div {...props}>
    <Link to="/">
      <Heart />
    </Link>
    <Link to="/">
      <Bag />
      &nbsp;{'(0)'}
    </Link>
  </div>
))`
  display: flex;
  align-items: center;
  margin-left: 1.875rem;

  a {
    display: flex;
    align-items: center;
    height: 100%;
    margin-right: 1.25rem;
    color: rgb(0, 0, 0);
    font-size: 0.75rem;
    line-height: 1.1875rem;
  }
`

const Navbar = props => (
  <BaseNavbar {...props}>
    <FlexContainer>
      <NavbarLeft>
        <Logo />
        <Menu />
      </NavbarLeft>
      <NavbarRight>
        <SearchBox />
        <Actions />
      </NavbarRight>
    </FlexContainer>
  </BaseNavbar>
)

export default Navbar
