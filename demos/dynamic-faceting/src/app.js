import algoliasearch from 'algoliasearch/lite'
import instantsearch from 'instantsearch.js'
import {
  configure,
  dynamicWidgets,
  hits,
  pagination,
  searchBox,
} from 'instantsearch.js/es/widgets'
import { hit, refinementList as customRefinementList } from './components'

const searchClient = algoliasearch('0UI9MOXMX5', '1d30c6a6ea8a7dfcc9797671c39723db')

const search = instantsearch({
  indexName: 'dynamic_facets',
  searchClient,
})

const transformItems = (facetList, { results }) => {
  const dynamicFacetsOptions = results._rawResults[ 0 ].facets.dynamic_options_facets // TODO: avoid using _rawResults
  if (!dynamicFacetsOptions) return facetList

  const dynamicFacets = Object.keys(dynamicFacetsOptions)
    .sort((a, b) => dynamicFacetsOptions[a].count - dynamicFacetsOptions[b].count)
    .slice(0, 5)
    .filter(facet => dynamicFacetsOptions[ facet ] > 100)
    .map(facet => `dynamic_options.${facet}`)
  
  return [...facetList, ...dynamicFacets]
}

const refinementListDefaultParams = {
  showMore: true,
  showMoreLimit: 20,
  searchable: true,
  searchableIsAlwaysActive: false,
}

search.addWidgets([
  configure({
    hitsPerPage: 10,
  }),
  searchBox({
    container: '#searchbox',
  }),
  hits({
    container: '#hits',
    templates: {
      item: hit,
    },
  }),
  dynamicWidgets({
    container: '#dynamic-list',
    widgets: [],
    transformItems,
    fallbackWidget: params => customRefinementList({
      ...refinementListDefaultParams,
      ...params,
    }),
  }),
  pagination({
    container: '#pagination',
  }),
])

search.start()
