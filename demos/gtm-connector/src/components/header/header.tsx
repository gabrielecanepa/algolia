import React, { ReactElement } from 'react'
import Link from 'next/link'

import { site } from '@/config'

const Header = (props): ReactElement => (
  <header {...props}>
    <h1 className="header__title">
      <Link className="header__link" href="/">
        {site.title}
      </Link>
    </h1>
    {site.algoliaLibrary ? (
      <p className="header__subtitle">
        {'using '}
        <Link className="header__link" href={site.algoliaLibrary.url} target="_blank">
          {site.algoliaLibrary.name}
        </Link>
      </p>
    ) : null}
  </header>
)

export default Header
