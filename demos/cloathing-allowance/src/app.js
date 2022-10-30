import algoliasearch from 'algoliasearch'
import instantsearch from 'instantsearch.js'
import { configure, hits, pagination, searchBox } from 'instantsearch.js/es/widgets'

import { generateSecuredApiKey } from './api'
import { userGroups } from './config'
import { productCard } from './templates'
import { cloathingToggle, facet } from './widgets'

// Env variables
const APP_ID = '0UI9MOXMX5'
const INDEX_NAME = 'prada.it.en_cloathing_allowance'

// DOM elements
const searchLoader = document.querySelector('.search-loader')
const searchPanel = document.querySelector('.search-panel')
const userSelect = document.querySelector('#user-group-select')

// Stored values
const store = {
  keys: {},
  search: null,
}

const runSearch = userGroup => {
  const searchClient = algoliasearch(APP_ID, store.keys[userGroup])

  // Needed to clear the eventual previous instance
  if (store.search) {
    store.search.dispose()
  }

  store.search = instantsearch({
    indexName: INDEX_NAME,
    searchClient,
  })

  const widgets = [
    configure({
      facets: ['*'],
      hitsPerPage: 12,
    }),
    searchBox({
      container: '#searchbox',
    }),
    hits({
      container: '#hits',
      templates: {
        item: productCard,
      },
    }),
    facet('gender'),
    facet('category'),
    facet('style'),
    facet('brand'),
    pagination({
      container: '#pagination',
    }),
  ]

  // Get the current cloathing genders - women, men or unisex
  const { cloathingGenders } = userGroups[userGroup]

  if (cloathingGenders.length > 0) {
    widgets.push(
      cloathingToggle({
        container: '#cloathing-toggle',
        header: 'Cloathing Allowance',
        label: 'Available products',
        cloathingGenders,
      })
    )
  }

  store.search.addWidgets(widgets)
  store.search.start()
}

// Run app asynchronously
(async () => {
  // Fetch and store key for each user group
  for (const group of Object.keys(userGroups)) {
    const { key } = await generateSecuredApiKey(userGroups[group].options)
    store.keys[group] = key
  }

  // Run a new search instance on user group change
  userSelect.addEventListener('change', ({ target }) => {
    runSearch([target.value])
  })

  // Run initial search with default user group
  runSearch(userSelect.value)

  // Hide loader and show search panel
  searchLoader.remove()
  searchPanel.classList.remove('is-hidden')
})()
