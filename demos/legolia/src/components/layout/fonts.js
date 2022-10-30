import { createGlobalStyle } from 'styled-components'

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'CeraPro';
    src: url('/fonts/CeraPro-Regular.woff2');
    format: 'woff2';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'CeraPro';
    src: url('/fonts/CeraPro-Medium.woff2');
    format: 'woff2';
    font-style: medium;
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'CeraPro';
    src: url('/fonts/CeraPro-Bold.woff2');
    format: 'woff2';
    font-style: bold;
    font-weight: 600;
    font-display: swap;
  }
`

export default Fonts
