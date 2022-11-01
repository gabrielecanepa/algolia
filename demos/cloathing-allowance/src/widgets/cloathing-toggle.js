const connectCloathingToggle = (renderFn, disposeFn, params) => {
  const { attribute, checkbox, filterAttribute, genders, label } = params

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
          ? genders.map(gender => `${filterAttribute}:${gender}`).join(' OR ')
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
        return { count: 0 }
      }

      const { facets } = results._rawResults[0]

      const count = genders.reduce((count, gender) => {
        const facet = facets[`${attribute}.${gender}`]
        if (!facet) return count
        return count += Object.values(facet).reduce((sum, value) => sum += value, 0)
      }, 0)

      return { count }
    },
  }
}

export default widgetParams => {
  const {
    attribute,
    container,
    filterAttribute,
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
          <span class="ais-RefinementList-count"></span>
        ` : ''}
      </label>
    </div>
  `

  containerNode.appendChild(root)

  const checkboxNode = root.querySelector('.ais-RefinementList-checkbox')
  const labelNode = root.querySelector('.ais-RefinementList-label')
  const countNode = root.querySelector('.ais-RefinementList-count')

  const render = renderOptions => {
    const { count } = renderOptions

    const disabled = count === 0

    checkboxNode.disabled = disabled

    disabled
      ? labelNode.classList.add('is-disabled')
      : labelNode.classList.remove('is-disabled')

    countNode.textContent = count
  }

  const dispose = () => {
    containerNode.removeChild(root)
  }

  const connectorParams = {
    attribute,
    checkbox: checkboxNode,
    filterAttribute,
    genders,
    label: labelNode,
  }

  return {
    ...connectCloathingToggle(render, dispose, connectorParams),
    $$widgetType: 'ais.cloathing-toggle',
  }
}
