import React, { lazy, ReactElement, ReactNode, useMemo } from 'react'
import Head from 'next/head'

const LayoutDefault = lazy(() => import('./default'))
const LayoutSearch = lazy(() => import('./search'))

type LayoutBaseProps = {
  title: string
}

const LayoutBase = ({ title }: LayoutBaseProps): ReactElement => (
  <Head>
    <title>{title}</title>
  </Head>
)

export type LayoutProps = LayoutBaseProps & {
  children: ReactNode
  layout: 'default' | 'empty' | 'search'
}

const Layout = ({ children, layout = 'default', title }: LayoutProps): ReactElement => {
  const LayoutPage = useMemo(() => {
    switch (layout) {
      case 'search':
        return LayoutSearch
      default:
        return LayoutDefault
    }
  }, [layout])

  return (
    <>
      <LayoutBase title={title} />
      <LayoutPage>{children}</LayoutPage>
    </>
  )
}

export default Layout
