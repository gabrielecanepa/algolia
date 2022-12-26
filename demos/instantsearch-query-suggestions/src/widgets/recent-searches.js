const WIDGET_NAME = 'ais.recent-searches'

const widgetStore = {
  nbHits: 0,
}

// Needed by InstantSearch
const connectRecentSearches = (renderFn, disposeFn) => ({
  $$type: WIDGET_NAME,
  init(initOptions) {
    renderFn(this.getWidgetRenderState(initOptions), true)
  },
  render(renderOptions) {
    renderFn(this.getWidgetRenderState(renderOptions), false)
  },
  dispose() {
    disposeFn()
  },
  getWidgetUiState(uiState) {
    return uiState
  },
  getWidgetSearchParameters(searchParameters) {
    return searchParameters
  },
  getRenderState(renderState) {
    return renderState
  },
  getWidgetRenderState(renderState) {
    return renderState
  },
})

export const getRecentSearches = () => {
  const localStorageItem = localStorage.getItem(WIDGET_NAME)

  try {
    return localStorageItem ? localStorageItem.split(',') : []
  } catch (e) {
    localStorage.removeItem(WIDGET_NAME)
    return []
  }
}

export const addRecentSearch = (query) => {
  const recentSearches = getRecentSearches()
  if (recentSearches.length > 0) {
    // Move query to first position if repeated.
    if (recentSearches.includes(query)) {
      recentSearches.splice(recentSearches.indexOf(query), 1)
    }
    // Remove last item if nbHits is reached.
    if (recentSearches.length > widgetStore.nbHits) {
      recentSearches.pop()
    }
  }
  // Add query to first position.
  recentSearches.unshift(query)
  localStorage.setItem(WIDGET_NAME, recentSearches.join(','))
}

export const recentSearches = widgetParams => {
  const { container, header = 'Your searches', nbHits = 3 } = widgetParams
  widgetStore.nbHits = nbHits

  const containerNode = typeof container === 'string'
    ? document.querySelector(container)
    : container

  containerNode.innerHTML = `
    <h3 class="ais-Header">${header}</h3>
    <div class="ais-Hits">
      <ul class="ais-Hits-list"></ul>
    </div>
  `

  const listElement = container.querySelector('.ais-Hits-list')
  const recentSearches = getRecentSearches()

  for (const query of recentSearches) {
    const listItem = document.createElement('li')
    listItem.classList.add('ais-Hits-item')
    const link = document.createElement('a')
    link.classList.add('ais-Hits-link')
    link.innerHTML = `⟳ ${query}`
    link.addEventListener('click', () => {
      alert(`Query "${query}" re-added to the recent searches. TODO: redirect to search results page.`)
      addRecentSearch(query)
      window.location.reload()
    })

    listItem.appendChild(link)
    listElement.appendChild(listItem)
  }

  const render = () => {}

  const dispose = () => containerNode.innerHTML = ''

  return {
    $$widgetType: 'ais.cloathing-toggle',
    ...connectRecentSearches(render, dispose),
  }
}
