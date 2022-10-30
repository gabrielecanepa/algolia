const connectCloathingToggle = (renderFn, disposeFn, params) => ({
  $$type: 'ais.cloathing-toggle',
  init(initOptions) {
    const { helper, instantSearchInstance } = initOptions

    params.checkbox.addEventListener('change', () => {
      if (!params.checkbox.checked) {
        helper.setQueryParameter('filters', '').search()
        return
      }

      const filters = params.cloathingGenders
        .map(gender => `cloathing:${gender}`)
        .join(' OR ')

      helper
        .setQueryParameter('filters', filters)
        .search()
    })

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
  getWidgetRenderState({ helper, results }) {
    // Initial render
    if (!results) {
      return { disabled: false }
    }

    // Check if the current user has cloathing options
    const currentFacets = results._rawResults[0].facets
    const disabled = params.cloathingGenders.every(gender => !currentFacets[`cloathingPrices.${gender}`])

    return { disabled }
  },
})

export default widgetParams => {
  const {
    cloathingGenders,
    container,
    header = 'Cloathing Allowance',
    label = 'Available products',
  } = widgetParams

  const containerNode = typeof container === 'string'
    ? document.querySelector(container)
    : container

  const root = document.createElement('div')
  root.classList.add('ais-Panel')

  root.innerHTML = `
    <div class="ais-Panel-header">
      <span>${header}</span>
    </div>
    <div class="ais-Panel-body">
      <label class="ais-RefinementList-label">
        <input type="checkbox" class="ais-RefinementList-checkbox">
        <span class="ais-RefinementList-labelText">${label}</span>
      </label>
    </div>
  `

  containerNode.appendChild(root)

  const checkboxNode = root.querySelector('.ais-RefinementList-checkbox')
  const labelNode = root.querySelector('.ais-RefinementList-label')

  const render = renderOptions => {
    const { disabled } = renderOptions

    checkboxNode.disabled = disabled

    disabled
      ? labelNode.classList.add('is-disabled')
      : labelNode.classList.remove('is-disabled')
  }

  const dispose = () => {
    containerNode.removeChild(root)
  }

  const connectorParams = {
    cloathingGenders,
    checkbox: checkboxNode,
  }

  return {
    ...connectCloathingToggle(render, dispose, connectorParams),
    $$widgetType: 'ais.cloathing-toggle',
  }
}
