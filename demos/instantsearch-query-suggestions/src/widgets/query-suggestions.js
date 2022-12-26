import { connectHits } from 'instantsearch.js/es/connectors'
import { highlight } from 'instantsearch.js/es/helpers'

import { addRecentSearch } from './recent-searches'

export const querySuggestions = connectHits(renderOptions => {
  const {
    hits,
    results,
    widgetParams: { container, header = 'Popular searches', searchBoxContainer },
  } = renderOptions

  if (!results || hits.length === 0) return

  container.innerHTML = `
    <h3 class="ais-Header">${header}</h3>
    <div class="ais-Hits">
      <ul class="ais-Hits-list"></ul>
    </div>
  `

  // Display hint
  const hintElement = searchBoxContainer.querySelector('.ais-SearchBox-hint')
  const hint = results.query ? hits.map(hit => hit.query).find(suggestion => suggestion.startsWith(results.query)) : ''
  hintElement.placeholder = hint || ''

  // Build suggestions
  const listElement = container.querySelector('.ais-Hits-list')
  const suggestionHits = hint ? hits.filter(hit => hit.query !== hint) : hits.slice(0, 2)

  for (const hit of suggestionHits) {
    const listItem = document.createElement('li')
    listItem.classList.add('ais-Hits-item')
    const link = document.createElement('a')
    link.classList.add('ais-Hits-link')
    link.innerHTML = `🔍 ${highlight({ attribute: 'query', hit })}`
    link.addEventListener('click', () => {
      alert(`Query "${hit.query}" added to the recent searches. TODO: redirect to search results page.`)
      addRecentSearch(hit.query)
      window.location.reload()
    })

    listItem.appendChild(link)
    listElement.appendChild(listItem)
  }
})
