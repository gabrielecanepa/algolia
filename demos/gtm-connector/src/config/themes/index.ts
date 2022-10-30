import { ThemeName } from '@/enums'
import { Theme } from '@/types'

import dark from './dark'
import base from './default'
import light from './light'

const themes: {
  [key in ThemeName]: Theme
} = {
  dark,
  base,
  light,
}

export default themes
