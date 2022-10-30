import algoliasearch from 'algoliasearch'
import instantsearch from 'instantsearch.js'
import { configure, index, searchBox } from 'instantsearch.js/es/widgets'

import { productHits, querySuggestionHits } from './hits'

// Constants (env variables)
const APP_ID = '0UI9MOXMX5'
const PUBLIC_API_KEY = '1d30c6a6ea8a7dfcc9797671c39723db'
const PRODUCTS_INDEX = 'fendi.it.en'
const QUERY_SUGGESTIONS_INDEX = 'fendi.it.en_qs'

// Initialize client
const searchClient = algoliasearch(APP_ID, PUBLIC_API_KEY)

// Containers
const querySuggestionContainer = document.querySelector('#query-suggestions')
const productsContainer = document.querySelector('#products')

const search = instantsearch({
  indexName: PRODUCTS_INDEX,
  searchClient,
  searchFunction(helper) {
    const { query } = helper.state

    // If there's no query, empty the containers and don't send the request
    if (!query.trim()) {
      querySuggestionContainer.innerHTML = ''
      productsContainer.innerHTML = ''
      return
    }

    helper
      .setQueryParameter('filters', `NOT query:'${query.trim()}'`)
      .search()
  },
})

search.addWidgets([
  configure({
    hitsPerPage: 6,
  }),
  searchBox({
    container: '#searchbox',
    placeholder: 'Search for',
    showSubmit: false,
    showLoadingIndicator: true,
  }),
  productHits({
    container: productsContainer,
  }),
  // Query suggestions index
  index({
    indexName: QUERY_SUGGESTIONS_INDEX,
  }).addWidgets([
    configure({
      hitsPerPage: 3,
    }),
    querySuggestionHits({
      container: querySuggestionContainer,
    }),
  ]),
])

search.start()
