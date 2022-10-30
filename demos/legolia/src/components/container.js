import styled from 'styled-components'
import { createElement } from 'react'

const Container = ({ as = 'div', children, ...props }) => createElement(as, props, children)

export default styled(Container)`
  margin: 0 auto;
  padding: 0 1.875rem;
  width: 100%;
  max-width: 100rem;
  height: 100%;

  ${({ flex }) =>
    flex &&
    `
    display: flex;
  `}
`
