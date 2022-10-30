import Layout from '@/components/layout'
import Search from '@/components/search'
import theme from '@/theme'
import { ThemeProvider } from 'styled-components'

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Search>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Search>
  </ThemeProvider>
)

export default App
