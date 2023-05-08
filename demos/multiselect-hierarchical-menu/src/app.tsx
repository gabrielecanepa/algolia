import algoliasearch, { SearchClient } from 'algoliasearch/lite'
import { Configure, Hits, InstantSearch, RefinementList } from 'react-instantsearch-hooks-web'
import { MultiselectHierarchicalMenu } from './multiselect-hierarchical-menu'
import './styles.css'

const indexName = 'instant_search'
const hierarchicalAttributes = ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1']

const hierarchicalAttributesRequest = {
  indexName,
  params: {
    analytics: false,
    clickAnalytics: false,
    facets: hierarchicalAttributes,
    hitsPerPage: 0,
    maxValuesPerFacet: 1000,
  },
}

let isInitialSearchRequest = true

const algoliaClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76')

const searchClient: SearchClient = {
  ...algoliaClient,
  async search(requests) {
    // Return a standard search if not the initial request.
    if (!isInitialSearchRequest) return await algoliaClient.search(requests)
    isInitialSearchRequest = false

    // Append a request to fetch the full facets list if the initial request is filtered.
    const hasFilters = requests.some(request => {
      const { facetFilters } = request.params
      if (!Array.isArray(facetFilters)) return false
      return facetFilters.flat().some(filter => !hierarchicalAttributes.includes(filter.split(':')[0]))
    })
    const initialRequests = hasFilters ? [...requests, hierarchicalAttributesRequest] : requests
    return await algoliaClient.search(initialRequests)
  },
}

type HitProps = {
  hit: {
    image: string
    name: string
  }
}

const Hit = ({ hit }: HitProps) => {
	return <img src={hit.image} alt={hit.name} />
}

const App = () => (
  <>
    <a href="/">
      <h1>Algolia</h1>
      <h1><code>MultiselectHierarchicalMenu</code></h1>
    </a>

    <InstantSearch searchClient={searchClient} indexName={indexName} routing>
      <Configure disjunctiveFacets={hierarchicalAttributes} maxValuesPerFacet={1000} />
      <main>
        <div className="refinements">
          <h3>Category</h3>
          <MultiselectHierarchicalMenu attributes={hierarchicalAttributes} />
          <h3>Brand</h3>
          <RefinementList attribute="brand" />
        </div>
        <Hits hitComponent={Hit} />
      </main>
    </InstantSearch>
  </>
)

export default App
