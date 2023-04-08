import { connectHits } from 'instantsearch.js/es/connectors'

const productCard = hit => {
  const { image_groups, name, price, short_description } = hit
  const imageUrl = `${image_groups[0].images[0].dis_base_link}?bgc=246%2C246%2C246&wid=603&hei=603&sw=603&sh=603`

  return `
    <div class="product-card">
      <img class="product-card__image" src="${imageUrl}" alt="${name}">
      <div class="product-card__body">
        <p class="product-card__title">${name}</p>
        <p class="product-card__description">${short_description}</p>
        <p class="product-card__price">${price ? price.EUR : '(Price not available)'}€</p>
      </div>
    </div>
  `
}

let widgetContainer

const renderFn = (renderOptions, isFirstRender) => {
  const { hits, widgetParams } = renderOptions
  widgetContainer = widgetParams.container

  if (isFirstRender) return

  if (hits.length === 0) {
    widgetContainer.innerHTML = `
      <div class="ais-Hits ais-Hits--empty">
        <p>No results</p>
      </div>
    `
    return
  }

  // prettier-ignore
  widgetContainer.innerHTML = `
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
}

const disposeFn = () => {
  widgetContainer.innerHTML = ''
}

export const products = connectHits(renderFn, disposeFn)
