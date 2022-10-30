import { StyleScope } from '@/enums'
import { withStyle } from '@/utils'

import ThemeComponent from './theme.component'
import { ThemeName } from './theme.enums'
import themeStyle from './theme.style'
import type { ThemeProps } from './theme.types'

const Theme = withStyle<ThemeProps>(ThemeComponent, themeStyle, StyleScope.global)

export default Theme
export { ThemeComponent, ThemeName, ThemeProps, themeStyle }
