import { NextPage } from 'next'

import { LayoutName } from '@/enums'

export type Page<P = Record<string, 'never'>, IP = P> = NextPage<P, IP> & {
  title?: string
  layout?: LayoutName
}
