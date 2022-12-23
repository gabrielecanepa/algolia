import { connectSearchBox } from 'instantsearch.js/es/connectors'

export const searchBox = connectSearchBox((renderOptions, isFirstRender) => {
  const { refine, widgetParams } = renderOptions
  const { container, placeholder = 'Search for' } = widgetParams

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
        />
        <input class="ais-SearchBox-hint" readonly tabindex="-1" />
      </div>
    `

    const input = container.querySelector('.ais-SearchBox-input')
    const hint = container.querySelector('.ais-SearchBox-hint')

    input.addEventListener('input', ({ target }) => {
      if (!target.value || !hint.placeholder.startsWith(target.value)) {
        hint.placeholder = ''
        if (!target.value) return
      }
      refine(target.value)
    })
    input.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return

      event.preventDefault()

      if (hint.placeholder.length > event.target.value.length) {
        input.value = hint.placeholder
        refine(input.value)
      }
    })
  }
})
