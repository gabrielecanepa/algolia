// Custom widget - see https://algolia.com/doc/guides/building-search-ui/widgets/create-your-own-widgets/js

const WIDGET_NAME = 'ais.searchBanner'

const connectBanner = (renderFn, disposeFn) => ({
  $$type: WIDGET_NAME,
  init() {
    renderFn()
  },
  dispose() {
    disposeFn()
  },
})

export const searchBanner = widgetParams => {
  const { container, query, visible = true } = widgetParams

  if (!visible) {
    disposeFn()
    return
  }

  const containerNode = typeof container === 'string' ? document.querySelector(container) : container

  const renderFn = () => {}

  const disposeFn = () => {
    containerNode.innerHTML = ''
  }

  if (query) {
    containerNode.innerHTML = `
      <div class="ais-SearchBanner">
        <h1>${query}</h1>
      </div>
    `
  }

  return connectBanner(renderFn, disposeFn)
}
