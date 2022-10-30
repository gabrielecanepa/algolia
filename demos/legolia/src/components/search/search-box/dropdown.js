import styled from 'styled-components'
import { Configure, Highlight, Index } from '@/components/search'
import { Image, Link } from '@/components'
import { algolia } from '@/config'
import { useCallback, useHits, useMemo, useSearch } from '@/hooks'

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: ${({ isSearchPage }) => (isSearchPage ? '1fr' : '1fr 2fr')};
  background-color: var(--bg);
  padding: 0.4rem 2.8rem 1.4rem;
  box-shadow: 0px 2px 2px rgb(0 0 0 / 10%);
  border-radius: 0 0 1.25rem 1.25rem;
`

const QSHit = styled(({ hit, ...props }) => {
  const { setValue, setOpen } = useSearch()

  const onClick = useCallback(
    hit => () => {
      setValue(hit.query)
      setOpen(false)
    },
    [setOpen, setValue]
  )

  return (
    <Link onClick={onClick} to={`/search?q=${hit.query}`} {...props}>
      <Highlight attribute="query" hit={hit}>
        {hit.query}
      </Highlight>
    </Link>
  )
})`
  color: var(--fg);
  font-weight: 600;

  mark {
    font-weight: 400;
  }
`

const QSHits = styled(props => {
  const { hits } = useHits()

  const hasHits = useMemo(() => hits.length > 0, [hits.length])

  return (
    <div {...props}>
      {hasHits ? (
        <ul>
          {hits.map(hit => (
            <li key={hit.objectID}>
              <QSHit hit={hit} />
            </li>
          ))}
        </ul>
      ) : (
        <p>{'No results found'}</p>
      )}
    </div>
  )
})`
  li {
    padding: 0.2em 0;
  }
`

const ProductsHits = styled(({ ...props }) => {
  const { hits } = useHits()
  const hasHits = useMemo(() => hits.length > 0, [hits])

  return (
    <div {...props}>
      {hasHits ? (
        hits.map(hit => (
          <div key={hit.objectID}>
            <Link to="/">
              <Image alt="" src={hit.image} />
            </Link>
            <Link to="/">
              <Highlight attribute="name" hit={hit}>
                {hit.name}
              </Highlight>
            </Link>
          </div>
        ))
      ) : (
        <p>{'No hits'}</p>
      )}
    </div>
  )
})`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1.2rem;

  ${Link}:first-child {
    display: block;
  }
  ${Image} {
    border: 1px solid var(--border) !important;
  }
`

const Dropdown = props => {
  const { isSearchPage } = useSearch()

  return (
    <Wrapper isSearchPage={isSearchPage} {...props}>
      <Index indexName={algolia.indexNameQS}>
        <Configure hitsPerPage={10} />
        <QSHits />
      </Index>
      {!isSearchPage && <ProductsHits />}
    </Wrapper>
  )
}

export default Dropdown
