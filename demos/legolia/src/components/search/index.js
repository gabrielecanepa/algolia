import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-hooks'
import { algolia } from '@/config'

const algoliaClient = algoliasearch(algolia.appId, algolia.apiKey)

const searchClient = {
  ...algoliaClient,
  search(requests) {
    return algoliaClient.search(requests)
    // TODO: configure
  },
}

const Search = ({ children, ...props }) => (
  <InstantSearch indexName={algolia.indexName} searchClient={searchClient} {...props}>
    {children}
  </InstantSearch>
)

export default Search

import Highlight from './highlight'
import SearchBox from './search-box'
import SearchResults from './search-results'
import { Configure, Index } from 'react-instantsearch-hooks'

export { Configure, Highlight, Index, SearchBox, SearchResults }
