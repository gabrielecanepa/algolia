import { connectRefinementList } from 'instantsearch.js/es/connectors'

const createRenderer = ({ attribute, container }) => ({
  render(renderOptions, isFirstRender) {
    const {
      canToggleShowMore,
      isShowingMore,
      items,
      refine,
      toggleShowMore,
      widgetParams: {
        parentDivClass,
        showMore,
      },
    } = renderOptions

    let refinementList,
        list,
        showMoreButton

    if (isFirstRender) {
      // Add the wrapper
      refinementList = document.createElement('div')
      refinementList.classList.add('ais-RefinementList')
      if (parentDivClass) refinementList.classList.add(parentDivClass)
      container.appendChild(refinementList)

      // Add title
      const title = document.createElement('h4')
      title.classList.add('ais-RefinementList-title')
      const titleContent = attribute.includes('.') ? attribute.split('.')[1] : attribute
      title.textContent = `${titleContent[0].toUpperCase()}${titleContent.slice(1)}`
      refinementList.appendChild(title)

      // Add unordered list to fill in the items
      list = document.createElement('ul')
      list.classList.add('ais-RefinementList-list')
      refinementList.appendChild(list)

      // Add show more button
      if (showMore) {
        showMoreButton = document.createElement('button')
        showMoreButton.classList.add('ais-RefinementList-showMore')
        showMoreButton.textContent = 'Show more'    
        showMoreButton.addEventListener('click', toggleShowMore)
        refinementList.appendChild(showMoreButton)
      }

      return
    }

    refinementList = container.querySelector('.ais-RefinementList')
    list = container.querySelector('.ais-RefinementList-list')
    showMoreButton = container.querySelector('.ais-RefinementList-showMore')

    // If there are no items, remove the list from the DOM
    if (items.length === 0) {
      container.remove()
      return
    }

    // Add the items
    list.innerHTML = items
      .map(item => {
        const itemClasses = ['ais-RefinementList-item']
        if (item.isRefined) itemClasses.push('ais-RefinementList-item--selected')
        if (item.customClass) itemClasses.push(item.customClass)

        return `
          <li class="${itemClasses.join(' ')}">
            <div>
              <label class="ais-RefinementList-label">
                <input type="checkbox" class="ais-RefinementList-checkbox" value="${item.value}" checked="${item.isRefined}">
                <span class="ais-RefinementList-labelText">${item.label}</span>
                <span class="ais-RefinementList-count">${item.count}</span>
              </label>
            </div>
          </li>
        `
      })
      .join('')

    // Add the listener
    const listItems = container.querySelectorAll('.ais-RefinementList-item')
    
    for (const listItem of listItems) {
      listItem.addEventListener('click', e => {
        e.preventDefault()
        const value = listItem.querySelector('.ais-RefinementList-checkbox')?.value
        if (value) refine(value)
      })
    }

    // Show/hide the show more button
    if (!showMore) return

    showMoreButton.style.display = canToggleShowMore ? 'block' : 'none'
    showMoreButton.textContent = isShowingMore ? 'Show less' : 'Show more'
  },
  dispose() {
    container.innerHTML = ''
  },
})

export default params => {
  const { render, dispose } = createRenderer(params)
  return connectRefinementList(render, dispose)(params)
}
