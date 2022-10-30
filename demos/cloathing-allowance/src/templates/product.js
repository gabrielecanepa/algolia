export const productCard = hit => {
  const { cloathing, cloathingPrices, gender, imageUrl, price, title } = hit

  const cloathingPriceValue = cloathingPrices ? cloathingPrices[cloathing] : null

  return `
    <div class="product-card">
      ${cloathing ? '<span class="product-card__cloathing-badge">cloathing</span>' : ''}
      <img class="product-card__img" src="${imageUrl}" alt="" />
      <div class="product-card__body">
        <h2 class="product-card__title">${title}</h2>
        <p class="product-card__gender">${gender}</p>
        <p class="product-card__price">€${price.toLocaleString()}</p>
        ${cloathingPriceValue
            ? `<span class="product-card__price-badge"><b>€${cloathingPriceValue.toLocaleString()}</b> with cloathing</span>`
            : ''
         }
      </div>
    </div>
  `
}
