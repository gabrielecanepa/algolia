import NextLink from 'next/link'
import styled from 'styled-components'

const Link = styled(({ as, to = '/', children, ...props }) => (
  <NextLink as={as ?? to} href={to} passHref>
    <a {...props}>{children}</a>
  </NextLink>
))`
  color: ${({ variant = 'primary' }) => `var(--${variant})`};
  text-decoration: none;

  ${({ flex }) =>
    flex &&
    `
    display: flex;
  `}
`

export default Link
