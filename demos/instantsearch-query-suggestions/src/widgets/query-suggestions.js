import { connectHits } from 'instantsearch.js/es/connectors'
import { highlight } from 'instantsearch.js/es/helpers'

import { addRecentSearch } from './recent-searches'

const DEFAULT_WIDGET_PARAMS = {
  header: 'Popular searches',
  hitsPerPage: 3,
}

export const querySuggestions = connectHits(renderOptions => {
  const {
    hits,
    results,
    widgetParams: {
      container,
      searchBoxContainer,
      header = DEFAULT_WIDGET_PARAMS.header,
      hitsPerPage = DEFAULT_WIDGET_PARAMS.hitsPerPage,
    },
  } = renderOptions

  if (!results || hits.length === 0) return

  container.innerHTML = `
    <div class="ais-QuerySuggestions">
      <h3 class="ais-Header">${header}</h3>
      <div class="ais-Hits">
        <ul class="ais-Hits-list"></ul>
      </div>
    </div>
  `

  // Display hint
  const hintElement = searchBoxContainer.querySelector('.ais-SearchBox-hint')
  const hint = results.query ? hits.map(hit => hit.query).find(suggestion => suggestion.startsWith(results.query)) : ''
  hintElement.placeholder = hint || ''

  // Build suggestions
  const listElement = container.querySelector('.ais-Hits-list')
  const suggestionHits = hint ? hits.filter(hit => hit.query !== hint) : hits.slice(0, hitsPerPage)

  for (const hit of suggestionHits) {
    const listItem = document.createElement('li')
    listItem.classList.add('ais-Hits-item')

    const link = document.createElement('a')
    link.classList.add('ais-Hits-link')
    link.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z" /></svg>
      ${highlight({ attribute: 'query', hit })}
    `
    link.addEventListener('click', () => {
      addRecentSearch(hit.query)
      window.location.href = `/search?q=${encodeURIComponent(hit.query)}`
    })

    listItem.appendChild(link)
    listElement.appendChild(listItem)
  }
})
