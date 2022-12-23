import algoliasearch from 'algoliasearch'
import instantsearch from 'instantsearch.js'
import { configure, index } from 'instantsearch.js/es/widgets'

import { searchBox, products, querySuggestions } from './widgets'

// Environment
const APP_ID = process.env.APP_ID
const SEARCH_API_KEY = process.env.SEARCH_API_KEY
const PRODUCTS_INDEX = process.env.PRODUCTS_INDEX
const QUERY_SUGGESTIONS_INDEX = process.env.QUERY_SUGGESTIONS_INDEX

// Initialize client
const searchClient = algoliasearch(APP_ID, SEARCH_API_KEY)

// Containers
const searchBoxContainer = document.querySelector('#searchbox')
const querySuggestionsContainer = document.querySelector('#query-suggestions')
const productsContainer = document.querySelector('#products')

// Search
let isFirstRender = true

const searchFunction = async helper => {
  const query = helper.state.query.trim()
  // If there's no query, empty the containers and don't send the request.
  if (!query) {
    if (isFirstRender) {
      isFirstRender = false
      return
    }
    querySuggestionsContainer.innerHTML = ''
    productsContainer.innerHTML = ''
    return
  }
  // Add filter to avoid fetching the same exact query. NB: `query` must be a facet.
  helper.setQueryParameter('filters', `NOT query:'${query}'`).search()
}

const search = instantsearch({
  indexName: PRODUCTS_INDEX,
  searchClient,
  searchFunction,
})

search.addWidgets([
  configure({
    hitsPerPage: 6,
  }),
  searchBox({
    container: searchBoxContainer,
    placeholder: 'Search for',
  }),
  products({
    container: productsContainer,
  }),
  // Query suggestions index
  index({
    indexName: QUERY_SUGGESTIONS_INDEX,
  }).addWidgets([
    configure({
      hitsPerPage: 4,
    }),
    querySuggestions({
      container: querySuggestionsContainer,
      searchBoxContainer,
    }),
  ]),
])

search.start()
