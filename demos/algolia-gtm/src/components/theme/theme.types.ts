import { ReactElement } from 'react'

import { ThemeName } from './theme.enums'

export type ThemeProps = {
  children: ReactElement
  theme: ThemeName
}
