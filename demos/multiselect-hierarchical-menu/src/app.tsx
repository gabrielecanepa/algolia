import algoliasearch from 'algoliasearch/lite'
import { Configure, Hits, InstantSearch, RefinementList } from 'react-instantsearch-hooks-web'
import { MultiselectHierarchicalMenu } from './multiselect-hierarchical-menu'
import './styles.css'

const searchClient = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76')
const indexName = 'instant_search'
const attributes = ['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1']

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
		<h1>Algolia</h1>
		<h2>MultiselectHierarchicalMenu</h2>

    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Configure disjunctiveFacets={['hierarchicalCategories.lvl0', 'hierarchicalCategories.lvl1']} maxValuesPerFacet={1000} />
      <main>
        <MultiselectHierarchicalMenu attributes={attributes} />
        <RefinementList attribute="brand" />
        <Hits hitComponent={Hit} />
      </main>
		</InstantSearch>
	</>
)

export default App
