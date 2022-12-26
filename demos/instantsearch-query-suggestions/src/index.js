import algoliasearch from 'algoliasearch'
import instantsearch from 'instantsearch.js'
import { configure, index } from 'instantsearch.js/es/widgets'

import { products, querySuggestions, recentSearches, searchBox } from './widgets'

// Environment
const APP_ID = process.env.APP_ID
const SEARCH_API_KEY = process.env.SEARCH_API_KEY
const PRODUCTS_INDEX = process.env.PRODUCTS_INDEX
const QUERY_SUGGESTIONS_INDEX = process.env.QUERY_SUGGESTIONS_INDEX

// Initialize client
const searchClient = algoliasearch(APP_ID, SEARCH_API_KEY)

// Containers
const productsContainer = document.querySelector('#products')
const querySuggestionsContainer = document.querySelector('#query-suggestions')
const recentSearchesContainer = document.querySelector('#recent-searches')
const searchBoxContainer = document.querySelector('#searchbox')

// Search
// needed for routing
let initialRequest = true
let initialQuery = ''

const searchFunction = async helper => {
  let query = helper.state.query.trim()

  if (initialRequest) {
    query = initialQuery
    initialRequest = false
  }

  // Add filter to avoid fetching the same exact query. NB: `query` must be a facet.
  if (query) {
    helper.setQueryParameter('filters', `NOT query:'${query}'`)
  }

  helper.setQuery(query).search()
}

const search = instantsearch({
  indexName: PRODUCTS_INDEX,
  searchClient,
  searchFunction,
})

const runApp = () => {
  const { pathname } = window.location

  if (!['/', '/search'].includes(pathname)) {
    return document.body.innerHTML = '<code>404 - Not found</code>'
  }

  if (pathname === '/search') {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const { q } = Object.fromEntries(urlSearchParams.entries())
    initialQuery = q || ''
  }

  search.addWidgets([
    configure({
      hitsPerPage: 6,
    }),
    searchBox({
      container: searchBoxContainer,
      placeholder: 'Search for',
      initialQuery,
    }),
    products({
      container: productsContainer,
    }),
    // Query suggestions
    index({
      indexName: QUERY_SUGGESTIONS_INDEX,
    }).addWidgets([
      configure({
        hitsPerPage: 4, // 3 + hint
      }),
      querySuggestions({
        container: querySuggestionsContainer,
        searchBoxContainer,
      }),
      recentSearches({
        container: recentSearchesContainer,
        nbHits: 2,
      }),
    ]),
  ])

  search.start()
}

runApp()
