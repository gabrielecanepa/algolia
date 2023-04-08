import algoliasearch from 'algoliasearch'
import instantsearch from 'instantsearch.js'
import { configure, index } from 'instantsearch.js/es/widgets'

import { products, querySuggestions, recentSearches, searchBanner, searchBox } from './widgets'

// Environment
const APP_ID = '0UI9MOXMX5'
const SEARCH_API_KEY = '1d30c6a6ea8a7dfcc9797671c39723db'
const PRODUCTS_INDEX = 'fendi.it.en'
const QUERY_SUGGESTIONS_INDEX = 'fendi.it.en_query_suggestions'

// DOM elements
const searchBoxContainer = document.querySelector('#search-box')
const recentSearchesContainer = document.querySelector('#recent-searches')
const querySuggestionsContainer = document.querySelector('#query-suggestions')
const bannerContainer = document.querySelector('#search-banner')
const productsContainer = document.querySelector('#products')

// Routing
const { search: searchLocation } = window.location
const { q } = Object.fromEntries(new URLSearchParams(searchLocation).entries())
const initialQuery = q?.trim() || ''

// Search

// Check current page
const { pathname } = window.location
const isSRP = pathname === '/search'

// The initial index must be query suggestions on standard pages and products on SRP
const indexName = isSRP ? '<PRODUCTS_INDEX>' : '<QUERY_SUGGESTIONS_INDEX>'

// Store the initial request
let isInitialRequest = true

// Empty results to be returned with the initial request
const emptyResult = {
  hits: [],
  nbHits: 0,
  nbPages: 0,
  page: 0,
  processingTimeMS: 0,
  hitsPerPage: 0,
  exhaustiveNbHits: false,
  query: '',
  params: '',
}

// Base client
const algoliaClient = algoliasearch(APP_ID, SEARCH_API_KEY)

// Extended client
const searchClient = {
  async search(requests) {
    // 1. Initial request (one index only)
    if (isInitialRequest) {
      isInitialRequest = false

      // 1.1 Filter requests by current index
      const filteredRequests = requests.filter(request => request.indexName === indexName)

      // 1.2 Only fetch results for the current index
      const { results } = await algoliaClient.search(filteredRequests)

      // 1.3 Return results for the current index + empty results for the additional index
      return { results: [emptyResult, ...results] }
    }

    // 2. Subsequent requests (both indices)
    return await algoliaClient.search(requests)
  },
}

// Initialization

const initialize = () => {
  if (!['/search', '/'].includes(pathname)) {
    document.body.innerHTML = '<code>404 - Not found</code>'
    return
  }

  const search = instantsearch({
    indexName,
    searchClient,
  })

  search.addWidgets([
    searchBox({
      container: searchBoxContainer,
      placeholder: 'Search for',
      initialQuery,
    }),
    configure({
      hitsPerPage: 12,
    }),
    products({
      container: productsContainer,
    }),
    index({
      indexName: QUERY_SUGGESTIONS_INDEX,
    }).addWidgets([
      configure({
        hitsPerPage: 4, // 3 + 1 for the hint
      }),
      querySuggestions({
        container: querySuggestionsContainer,
        searchBoxContainer,
      }),
    ]),
    recentSearches({
      container: recentSearchesContainer,
      nbHits: 2,
    }),
    searchBanner({
      container: bannerContainer,
      query: initialQuery,
    }),
  ])

  search.start()
}

initialize()
