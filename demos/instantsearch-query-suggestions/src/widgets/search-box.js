import { connectSearchBox } from 'instantsearch.js/es/connectors'

import { addRecentSearch } from './recent-searches'

let widgetContainer

const renderFn = (renderOptions, isFirstRender) => {
  const { clear, refine, widgetParams } = renderOptions
  const { container, placeholder = 'Search for', initialQuery = '' } = widgetParams
  widgetContainer = container

  if (isFirstRender) {
    widgetContainer.innerHTML = `
      <div class="ais-SearchBox">
        <input
          class="ais-SearchBox-input"
          type="search"
          placeholder="${placeholder}"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          value="${initialQuery}"
        />
        <input class="ais-SearchBox-hint" readonly tabindex="-1" />
        <button class="ais-SearchBox-reset" type="reset" title="Clear the search query.">✕</button>
      </form>
    `

    const input = widgetContainer.querySelector('.ais-SearchBox-input')
    const hint = widgetContainer.querySelector('.ais-SearchBox-hint')
    const reset = widgetContainer.querySelector('.ais-SearchBox-reset')

    // Show hint only on focus
    hint.style.display = 'none'

    input.addEventListener('focus', () => {
      hint.style.display = ''
    })

    input.addEventListener('blur', () => {
      hint.style.display = 'none'
    })

    input.addEventListener('input', ({ target }) => {
      if (!hint.placeholder.startsWith(target.value)) {
        hint.placeholder = ''
      }
      refine(target.value)
    })

    input.addEventListener('keydown', event => {
      const query = event.target.value.trim()

      switch (event.key) {
        case 'Enter':
          if (!query || query === initialQuery) return
          addRecentSearch(query)
          window.location.href = `/search?q=${query}`
          break
        case 'ArrowRight':
        case 'Tab':
          if (hint.placeholder.length > query.length) {
            event.preventDefault()
            input.value = hint.placeholder
            refine(input.value)
          }
      }
    })

    reset.addEventListener('click', () => {
      clear()
      input.value = ''
      input.focus()
    })
  }
}

const disposeFn = () => {
  widgetContainer.innerHTML = ''
}

export const searchBox = connectSearchBox(renderFn, disposeFn)
