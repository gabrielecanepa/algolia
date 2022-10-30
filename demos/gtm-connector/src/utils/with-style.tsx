import { FunctionComponent, memo } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { StyleScope } from '@/enums'
import { Style, StyledComponent } from '@/types'

const withStyle = <P extends {}>(
  Component: FunctionComponent,
  style: Style,
  scope: StyleScope = StyleScope.local
): StyledComponent<P> => {
  if (scope === StyleScope.global) {
    const GlobalStyle = memo(createGlobalStyle`${style}`)

    return styled((props: P) => (
      <>
        <GlobalStyle />
        <Component {...props} />
      </>
    ))``
  }

  return styled(Component)`
    ${style}
  `
}

export default withStyle
