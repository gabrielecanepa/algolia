import { panel, refinementList } from 'instantsearch.js/es/widgets'

export default (name, opts = {}) => {
  return panel({
    templates: { header: name },
  })(refinementList)({
    container: `#${name}-list`,
    attribute: name,
    ...opts,
  })
}
