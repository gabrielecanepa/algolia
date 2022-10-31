const connectCloathingToggle = (renderFn, disposeFn, params) => {
  const { checkbox, genders, label } = params

  return {
    $$type: 'ais.cloathing-toggle',
    init(initOptions) {
      const { helper } = initOptions

      // Add filter event listener to the checkbox
      checkbox.addEventListener('change', () => {
        checkbox.checked
          ? label.classList.add('text-bold')
          : label.classList.remove('text-bold')

        const filters = checkbox.checked
          ? genders.map(gender => `cloathing:${gender}`).join(' OR ')
          : ''
        helper.setQueryParameter('filters', filters).search()
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
    getWidgetRenderState({ results }) {
      // Initial render
      if (!results) {
        return { disabled: false }
      }

      const { facets } = results._rawResults[0]
      // Disable if current user doesn't have cloathing options
      const disabled = genders.every(gender => !facets[`cloathingPrices.${gender}`])

      return { disabled }
    },
  }
}

export default widgetParams => {
  const {
    container,
    genders,
    header,
    label,
  } = widgetParams

  const containerNode = typeof container === 'string'
    ? document.querySelector(container)
    : container

  const root = document.createElement('div')
  root.classList.add('ais-Panel')

  root.innerHTML = `
    ${header ? `
      <div class="ais-Panel-header">
        <span>${header}</span>
      </div>
    ` : ''}
    <div class="ais-Panel-body">
      <label class="ais-RefinementList-label">
        <input type="checkbox" class="ais-RefinementList-checkbox">
        ${label ? `
          <span class="ais-RefinementList-labelText">${label}</span>
        ` : ''}
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
    checkbox: checkboxNode,
    genders,
    label: labelNode,
  }

  return {
    ...connectCloathingToggle(render, dispose, connectorParams),
    $$widgetType: 'ais.cloathing-toggle',
  }
}
