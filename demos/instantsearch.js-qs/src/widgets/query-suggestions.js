import { connectHits } from 'instantsearch.js/es/connectors'
import { highlight } from 'instantsearch.js/es/helpers'

export const querySuggestions = connectHits((renderOptions, isFirstRender) => {
  const {
    hits,
    results,
    widgetParams: { container, searchBoxContainer },
  } = renderOptions

  if (isFirstRender) {
    container.innerHTML = `
      <div class="ais-Hits">
        <ul class="ais-Hits-list"></ul>
      </div>
    `
  }

  if (!results || hits.length === 0) return

  // Display hint
  const hintElement = searchBoxContainer.querySelector('.ais-SearchBox-hint')
  const hint = hits.map(hit => hit.query).find(suggestion => suggestion.startsWith(results.query))
  hintElement.placeholder = hint || ''

  // Build suggestions
  const listElement = container.querySelector('.ais-Hits-list')
  const suggestionHits = hint ? hits.filter(hit => hit.query !== hint) : hits.slice(0, 2)

  listElement.innerHTML = suggestionHits.map(hit => `
    <li class="ais-Hits-item">
      <a class="ais-Hits-link">
        ${highlight({ attribute: 'query', hit })}
      </a>
    </li>
  `).join('')
})
