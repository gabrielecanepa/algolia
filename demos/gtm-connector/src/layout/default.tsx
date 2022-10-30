import { ReactElement } from 'react'

import { Header } from '@/components'

const LayoutDefault = ({ children }): ReactElement => (
  <div>
    <Header />
    {children}
  </div>
)

export default LayoutDefault
