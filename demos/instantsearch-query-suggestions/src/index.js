import algoliasearch from 'algoliasearch'
import instantsearch from 'instantsearch.js'
import { configure, index } from 'instantsearch.js/es/widgets'

import { products, querySuggestions, recentSearches, searchBox } from './widgets'

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

// Search
const searchConfig = {
  products: {
    indexName: PRODUCTS_INDEX,
    params: {
      hitsPerPage: 12,
    },
  },
  querySuggestions: {
    indexName: QUERY_SUGGESTIONS_INDEX,
    params: {
      hitsPerPage: 3,
    },
  },
  recentSearches: {
    params: {
      hitsPerPage: 2,
    },
  },
}

const searchState = {
  initialRequest: true,
  initialQuery: '',
}

const searchClient = algoliasearch(APP_ID, SEARCH_API_KEY)

// Search
const searchFunction = async helper => {
  let query = helper.state.query.trim()

  // Routing rendering for /search page
  switch (searchState.initialRequest) {
    case true: {
      query = searchState.initialQuery
      searchState.initialRequest = false
      if (query) {
        bannerContainer.innerHTML = `<h1>${query}</h1>`
        querySuggestionsContainer.style.display = 'none'
        recentSearchesContainer.style.display = 'none'
        break
      }
      bannerContainer.innerHTML = query ? '' : '<h2>You might also like</h2>'
    }
    case false: {
      bannerContainer.innerHTML = query ? '' : '<h2>You might also like</h2>'
      querySuggestionsContainer.style.display = ''
      recentSearchesContainer.style.display = query ? 'none' : ''
    }
  }

  // Add filter to avoid fetching the same exact query. NB: `query` must be a facet.
  const filters = query ? `NOT query:'${query}'` : ''
  helper.setQuery(query).setQueryParameter('filters', filters).search()
}

const search = instantsearch({
  indexName: PRODUCTS_INDEX,
  searchClient,
  searchFunction,
})

const runApp = () => {
  const { pathname } = window.location

  if (!['/', '/search'].includes(pathname)) {
    return (document.body.innerHTML = '<code>404 - Not found</code>')
  }

  if (pathname === '/search') {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const { q } = Object.fromEntries(urlSearchParams.entries())
    searchState.initialQuery = q || ''
  }

  search.addWidgets([
    searchBox({
      container: searchBoxContainer,
      placeholder: 'Search for',
      initialQuery: searchState.initialQuery,
    }),
    recentSearches({
      container: recentSearchesContainer,
      ...searchConfig.recentSearches.params,
    }),
    // Products
    index({
      indexName: searchConfig.products.indexName,
    }).addWidgets([
      configure(searchConfig.products.params),
      products({
        container: productsContainer,
      }),
    ]),
    // Query suggestions
    index({
      indexName: searchConfig.querySuggestions.indexName,
    }).addWidgets([
      configure({
        ...searchConfig.querySuggestions.params,
        hitsPerPage: searchConfig.querySuggestions.params.hitsPerPage + 1, // include hint
      }),
      querySuggestions({
        container: querySuggestionsContainer,
        searchBoxContainer,
      }),
    ]),
  ])

  search.start()
}

runApp()
