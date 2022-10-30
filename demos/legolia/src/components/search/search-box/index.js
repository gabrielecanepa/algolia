import Dropdown from './dropdown'
import SearchBar from './search-bar'
import styled from 'styled-components'
import { Configure } from '@/components/search'
import { useCallback, useClickOut, useHits, useMemo, useRef, useSearch } from '@/hooks'

const SearchContainer = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
`

const SearchBox = props => {
  const searchRef = useRef(null)
  const { value, setExpanded, open, setOpen, isSearchPage } = useSearch()
  const { hits } = useHits()

  const isOpen = useMemo(() => open && value && hits.length > 0, [hits.length, open, value])

  const onClickOut = useCallback(() => {
    setOpen(false)
    if (!value && !isSearchPage) setExpanded(false)
  }, [isSearchPage, value, setExpanded, setOpen])

  useClickOut(searchRef, onClickOut)

  return (
    <>
      <Configure hitsPerPage={8} />
      <SearchContainer ref={searchRef} {...props}>
        <SearchBar open={isOpen} />
        {isOpen && <Dropdown />}
      </SearchContainer>
    </>
  )
}

export default SearchBox
export { Dropdown, SearchBar }
