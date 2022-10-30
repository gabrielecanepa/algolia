import { createGlobalStyle } from 'styled-components'
import { themeToCss } from '@/utils'

export default createGlobalStyle`
  // Variables
  :root {
    ${({ theme }) => themeToCss(theme)}
  }

  // Elements
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font);
    width: 100%;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    color: var(--fg);
    background: var(--bg);
  }
  ul {
    list-style-type: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
  }

  // States
  * {
    &:focus, &:focus-visible {
      outline-color: var(--primary);
      outline-style: dashed;
    }
    &::selection {
      background: var(--primary);
      color: var(--bg);
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`
