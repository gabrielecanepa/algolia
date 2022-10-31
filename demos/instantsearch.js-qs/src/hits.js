import { connectHits } from 'instantsearch.js/es/connectors'
import { highlight } from 'instantsearch.js/es/helpers'

export const productCard = hit => {
  const { image_groups, name, price, short_description } = hit
  const imageUrl = `${image_groups[0].images[0].dis_base_link}?bgc=246%2C246%2C246&wid=603&hei=603&sw=603&sh=603`

  return `
    <div class="product-card">
      <img class="product-card__image" src="${imageUrl}" alt="${name}">
      <div class="product-card__body">
        <p>${name}</p>
        <p>${short_description}</p>
        ${price ? `<p>${price.EUR}€</p>` : '(Price not available)'}
      </div>
    </div>
  `
}

// Product hits
export const productHits = connectHits((renderOptions, isFirstRender) => {
  const { hits, widgetParams: { container } } = renderOptions

  if (isFirstRender) return

  if (hits.length === 0) {
    container.innerHTML = `
      <div class="ais-Hits--empty">
        <p>No results</p>
      </div>
    `
    return
  }

  container.innerHTML = `
    <div class="ais-Hits">
      <ul class="ais-Hits-list">
        ${hits.map(hit => `
          <li class="ais-Hits-item">
            ${productCard(hit)}
          </li>
        `).join('')}
      </ul>
    </div>
  `
})

// Query suggestion custom hits to add interactivity
export const querySuggestionHits = connectHits((renderOptions, isFirstRender) => {
  const { hits, instantSearchInstance: { helper }, widgetParams: { container } } = renderOptions

  if (isFirstRender) return

  // Clear container
  if (container.firstChild) {
    container.removeChild(container.firstChild)
  }

  if (hits.length === 0) return

  const suggestions = hits.map(hit => {
    // Build suggestion element
    const listItemElement = document.createElement('li')
    listItemElement.classList.add('ais-Hits-item')

    const linkElement = document.createElement('a')
    linkElement.classList.add('ais-Hits-link')
    linkElement.innerHTML = highlight({ attribute: 'query', hit })
    linkElement.addEventListener('click', () => {
      helper.setQuery(hit.query).search()
    })

    listItemElement.appendChild(linkElement)
    return listItemElement
  })

  // Build list element
  const hitsElement = document.createElement('div')
  hitsElement.classList.add('ais-Hits')
  const listElement = document.createElement('ul')
  listElement.classList.add('ais-Hits-list')

  // Append suggestions to the list
  listElement.append(...suggestions)
  hitsElement.appendChild(listElement)
  container.appendChild(hitsElement)
})
