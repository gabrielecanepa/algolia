import { connectSearchBox } from 'instantsearch.js/es/connectors'

export const searchBox = connectSearchBox((renderOptions, isFirstRender) => {
  const { refine, widgetParams } = renderOptions
  const { container, placeholder = 'Search for', initialQuery  } = widgetParams

  if (isFirstRender) {
    container.innerHTML = `
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
      </form>
    `

    const input = container.querySelector('.ais-SearchBox-input')
    const hint = container.querySelector('.ais-SearchBox-hint')

    input.addEventListener('input', ({ target }) => {
      if (!hint.placeholder.startsWith(target.value)) {
        hint.placeholder = ''
      }
      refine(target.value)
    })

    input.addEventListener('keydown', event => {
      if (!['Enter', 'Tab'].includes(event.key)) return

      event.preventDefault()

      const query = event.target.value.trim()

      switch (event.key) {
        case 'Enter':
          if (!query) return
          window.location.href = `/search?q=${query}`
          return
        case 'Tab':
          if (hint.placeholder.length > query.length) {
            input.value = hint.placeholder
            refine(input.value)
          }
      }
    })
  }
})
