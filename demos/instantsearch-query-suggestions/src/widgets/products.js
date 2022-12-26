import { connectHits } from 'instantsearch.js/es/connectors'

const productCard = hit => {
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

export const products = connectHits((renderOptions, isFirstRender) => {
  const {
    hits,
    widgetParams: { container },
  } = renderOptions

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
        ${hits
          .map(
            hit => `
          <li class="ais-Hits-item">
            ${productCard(hit)}
          </li>
        `
          )
          .join('')}
      </ul>
    </div>
  `
})
