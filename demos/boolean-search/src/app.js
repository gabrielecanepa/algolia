import algoliasearch from 'algoliasearch'
import instantsearch from 'instantsearch.js'
import { configure, hits, pagination, panel, refinementList, searchBox } from 'instantsearch.js/es/widgets'
import { isBooleanSearch, parseBooleanSearch, titleizeItems } from './utils'
import { hit as hitTemplate } from './templates'
import './app.css'

const searchClient = algoliasearch('0UI9MOXMX5', '1d30c6a6ea8a7dfcc9797671c39723db')

const searchFunction = helper => {
  const { query } = helper.getQuery()

  if (!isBooleanSearch(query)) {
    helper.search()
    return
  }

  const { query: parsedQuery, optionalWords } = parseBooleanSearch(query)

  helper
    .setQuery(parsedQuery) // this call resets the page
    .setPage(helper.getPage()) // re-apply the previous page
    .setQueryParameter('optionalWords', optionalWords)
    .search()
}

const search = instantsearch({
  indexName: 'boolean_search',
  searchClient,
  searchFunction,
})

search.addWidgets([
  configure({
    hitsPerPage: 10,
  }),
  searchBox({
    container: '#searchbox',
    autofocus: true,
  }),
  hits({
    container: '#hits',
    templates: {
      item: hitTemplate,
    },
  }),
  panel({
    templates: { header: 'gender' },
  })(refinementList)({
    container: '#gender-list',
    attribute: 'gender',
    transformItems: titleizeItems,
  }),
  panel({
    templates: { header: 'category' },
  })(refinementList)({
    container: '#category-list',
    attribute: 'categories',
  }),
  panel({
    templates: { header: 'brand' },
  })(refinementList)({
    container: '#brand-list',
    attribute: 'brand',
  }),
  panel({
    templates: { header: 'color' },
  })(refinementList)({
    container: '#color-list',
    attribute: 'color',
    transformItems: titleizeItems,
  }),
  pagination({
    container: '#pagination',
  }),
])

search.start()
