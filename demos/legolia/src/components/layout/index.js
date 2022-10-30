import Fonts from './fonts'
import Head from './head'
import Navbar from './navbar'
import Style from './style'

const Layout = ({ children }) => (
  <>
    <Head />
    <Fonts />
    <Style />
    <Navbar />
    <main>{children}</main>
  </>
)

export default Layout
export { Fonts, Head, Navbar, Style }
