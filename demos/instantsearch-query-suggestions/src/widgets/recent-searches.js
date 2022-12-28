const DEFAULT_WIDGET_PARAMS = {
  widgetName: 'ais.recent-searches',
  header: 'Your searches',
  hitsPerPage: 3,
  minResults: 1,
}

const widgetStore = {
  isFirstRender: true,
}

// See https://algolia.com/doc/guides/building-search-ui/widgets/create-your-own-widgets/js
const connectRecentSearches = (renderFn, disposeFn) => ({
  $$type: widgetStore.widgetName,
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
  getWidgetRenderState({ results }) {
    return results
  },
})

export const getRecentSearches = () => {
  const localStorageItem = localStorage.getItem(widgetStore.widgetName)

  try {
    if (!localStorageItem) return []

    const items = localStorageItem.split(',')

    if (items.length > widgetStore.hitsPerPage) {
      const recentSearches = items.slice(0, widgetStore.hitsPerPage)
      localStorage.setItem(widgetStore.widgetName, recentSearches)
      return recentSearches
    }

    return items
  } catch (e) {
    localStorage.setItem(widgetStore.widgetName, '')
    return []
  }
}

export const addRecentSearch = query => {
  // TODO: normalize/reject the query.

  const recentSearches = getRecentSearches()

  if (recentSearches.length > 0) {
    // Move query to first position if repeated.
    if (recentSearches.includes(query)) {
      recentSearches.splice(recentSearches.indexOf(query), 1)
    }
    // Remove last item if hitsPerPage is reached.
    if (recentSearches.length > widgetStore.hitsPerPage) {
      recentSearches.pop()
    }
  }

  // Add query to first position.
  recentSearches.unshift(query)
  const stringifiedSearches = recentSearches.slice(0, widgetStore.hitsPerPage).join(',')
  localStorage.setItem(widgetStore.widgetName, stringifiedSearches)
}

export const recentSearches = widgetParams => {
  const {
    container,
    widgetName = DEFAULT_WIDGET_PARAMS.widgetName,
    header = DEFAULT_WIDGET_PARAMS.header,
    hitsPerPage = DEFAULT_WIDGET_PARAMS.hitsPerPage,
    minResults = DEFAULT_WIDGET_PARAMS.minResults,
  } = widgetParams

  // Store and use in localStorage functions.
  widgetStore.widgetName = widgetName
  widgetStore.hitsPerPage = hitsPerPage
  widgetStore.minResults = minResults

  const containerNode = typeof container === 'string' ? document.querySelector(container) : container

  const render = results => {
    if (!widgetStore.isFirstRender || !results) return

    if (results.query && results.nbHits >= minResults) {
      addRecentSearch(results.query)
    }

    widgetStore.isFirstRender = false
  }

  const dispose = () => {
    containerNode.innerHTML = ''
  }

  const widget = {
    $$widgetType: widgetName,
    ...connectRecentSearches(render, dispose),
  }

  const recentSearches = getRecentSearches()

  if (recentSearches.length === 0) {
    dispose()
    return widget
  }

  containerNode.innerHTML = `
    <div class="ais-RecentSearches">
      <h3 class="ais-Header">${header}</h3>
      <div class="ais-Hits">
        <ul class="ais-Hits-list"></ul>
      </div>
    </div>
  `

  const listElement = container.querySelector('.ais-Hits-list')

  for (const query of recentSearches) {
    const listItem = document.createElement('li')
    listItem.classList.add('ais-Hits-item')

    const link = document.createElement('a')
    link.classList.add('ais-Hits-link')
    link.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 108.67"><path d="M14.52,55.12a54.53,54.53,0,0,1,8.12-29.54A52.65,52.65,0,0,1,46.75,4.79a60.05,60.05,0,0,1,11.1-3.55,52.77,52.77,0,0,1,60.35,31.2,59.34,59.34,0,0,1,3.5,11.07,52.58,52.58,0,0,1-1.31,27,53.18,53.18,0,0,1-14.66,22.87A57.62,57.62,0,0,1,83,106.64a48.71,48.71,0,0,1-25,.74,47.51,47.51,0,0,1-7.89-2.58,49.43,49.43,0,0,1-7.56-4,3.82,3.82,0,0,1,4.16-6.41,40.79,40.79,0,0,0,6.4,3.42,40,40,0,0,0,6.62,2.16,41.07,41.07,0,0,0,21.12-.63,49.92,49.92,0,0,0,19.73-11.48,45.64,45.64,0,0,0,12.56-19.61,44.86,44.86,0,0,0,1.1-23.11,52.48,52.48,0,0,0-3-9.67A45.1,45.1,0,0,0,59.43,8.73a52.47,52.47,0,0,0-9.68,3.09A45,45,0,0,0,29.14,29.59a47,47,0,0,0-7,26l8.75-9.72A3.83,3.83,0,1,1,36.61,51L21.89,67.37a3.83,3.83,0,0,1-5.4.28L1.17,52.86a3.82,3.82,0,0,1,5.3-5.51l8.05,7.77ZM62.71,32.89a3.83,3.83,0,1,1,7.66,0v21.9l17.27,9.59a3.82,3.82,0,0,1-3.71,6.67L65,60.52A3.83,3.83,0,0,1,62.71,57V32.89Z"/></svg>
      ${query}
    `
    link.addEventListener('click', () => {
      addRecentSearch(query)
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    })

    listItem.appendChild(link)
    listElement.appendChild(listItem)
  }

  return widget
}
