import Breadcrumb from './breadcrumb'
import Hits from './hits'
import { Configure } from 'react-instantsearch-hooks'
import { useHits } from '@/hooks'

const SearchResults = props => {
  const { hits } = useHits()

  return (
    <div {...props}>
      <Breadcrumb />
      <Configure hitsPerPage={20} />
      <Hits hits={hits} />
    </div>
  )
}

export default SearchResults
export { Breadcrumb, Hits }
