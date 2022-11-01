import algoliasearch from 'algoliasearch'
import instantsearch from 'instantsearch.js'
import { configure, hits, pagination, searchBox, stats } from 'instantsearch.js/es/widgets'

import { generateSecuredApiKey } from './api'
import { userGroups } from './config'
import { productCard } from './templates'
import { cloathingToggle, refinementListPanel } from './widgets'

// Env variables
const APP_ID = '0UI9MOXMX5'
const INDEX_NAME = 'prada.it.en_cloathing_allowance'

// DOM elements
const searchLoader = document.querySelector('.search-loader')
const searchPanel = document.querySelector('.search-panel')
const userSelect = document.querySelector('#user-group-select')

// Secured keys and search instance
const keys = {}
let search

const runSearch = userGroup => {
  const searchClient = algoliasearch(APP_ID, keys[ userGroup ])

  // Clear the eventual previous search instance
  if (search) search.dispose()

  search = instantsearch({
    indexName: INDEX_NAME,
    searchClient,
  })

  search.addWidgets([
    configure({
      facets: ['*'],
      hitsPerPage: 12,
    }),
    searchBox({
      container: '#searchbox',
    }),
    stats({
      container: '#stats',
    }),
    hits({
      container: '#hits',
      templates: {
        empty: () => null,
        item: productCard,
      },
    }),
    refinementListPanel('gender'),
    refinementListPanel('category'),
    refinementListPanel('style'),
    pagination({
      container: '#pagination',
    }),
  ])

  // Cloathing widget
  const { genders } = userGroups[userGroup]

  if (genders.length > 0) {
    search.addWidgets([
      cloathingToggle({
        container: '#cloathing-toggle',
        header: 'Cloathing Allowance',
        label: 'Available products',
        attribute: 'cloathingPrices',
        filterAttribute: 'cloathing',
        genders,
      }),
    ])
  }

  search.start()
}

(async () => {
  // Fetch secured API keys
  for (const group of Object.keys(userGroups)) {
    const { key } = await generateSecuredApiKey(userGroups[group].options)
    keys[group] = key
  }

  // User select
  userSelect.addEventListener('change', ({ target }) => {
    runSearch([target.value])
  })

  // Run initial search
  runSearch(userSelect.value)
  searchLoader.remove()
  searchPanel.classList.remove('is-hidden')
})()
