import { FunctionComponent } from 'react'
import type { FlattenSimpleInterpolation, StyledComponent as StyledComponentBase } from 'styled-components'

import { themes } from '@/config'
import { ThemeName } from '@/enums'

export type Style = FlattenSimpleInterpolation

export type StyledComponent<P extends {}> = StyledComponentBase<
  FunctionComponent<P>,
  typeof themes[ThemeName],
  P,
  never
>
