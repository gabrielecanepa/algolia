import type { ReactNode } from 'react'
import type { AppProps as NextAppProps } from 'next/app'

import Theme, { ThemeName } from '@/components/theme'
import { site } from '@/config'
import Layout from '@/layout'
import { Page } from '@/types'

export type AppProps = NextAppProps & {
  Component: Page
}

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  const { layout = 'default', title = site.title } = Component

  return (
    <Theme theme={ThemeName.base}>
      <Layout layout={layout} title={title}>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App
