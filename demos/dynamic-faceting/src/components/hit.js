import { highlight } from 'instantsearch.js/es/helpers'

export default hit => `
  <img src="${hit.image_url}" />
  <h3>${highlight({ hit, attribute: 'title' })}</h3>
`
