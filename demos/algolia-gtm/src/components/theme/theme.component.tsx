import { ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'

import { themes } from '@/config'

import { ThemeProps } from './theme.types'

const ThemeComponent = ({ children, theme }: ThemeProps): ReactElement => (
  <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
)

export default ThemeComponent
