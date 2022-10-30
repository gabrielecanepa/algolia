import NextHead from 'next/head'
import site from '@/config/site'
import { useTheme } from 'styled-components'

const Head = () => {
  const theme = useTheme()

  return (
    <NextHead>
      <title>{site.title}</title>
      <meta content={site.description} name="description" />
      <meta charSet="utf-8" />
      <meta content="initial-scale=1.0, width=device-width" name="viewport" />
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      {/* Apple */}
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="yes" name="apple-touch-fullscreen" />
      <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
      {/* Open Graph */}
      <meta content={site.title} property="og:title" />
      <meta content={site.description} property="og:description" />
      {/* Fonts */}
      <link as="font" crossOrigin="" href="/fonts/CeraPro-Bold.woff2" rel="preload" />
      <link as="font" crossOrigin="" href="/fonts/CeraPro-Medium.woff2" rel="preload" />
      <link as="font" crossOrigin="" href="/fonts/CeraPro-Regular.woff2" rel="preload" />
      {/* PWA and favicon */}
      <meta content={theme.bg} name="msapplication-TileColor" />
      <meta content={theme.bg} name="theme-color" />
      <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
      <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
      <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
      <link href="/site.webmanifest" rel="manifest" />
      <link color={theme.colors.primary} href="/safari-pinned-tab.svg" rel="mask-icon" />
    </NextHead>
  )
}

export default Head
