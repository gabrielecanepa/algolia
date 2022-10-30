import { parseBooleanQuery } from 'boolean-parser'

export const titleize = string =>
  string
    .split(' ')
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ')

export const titleizeItems = items =>
  items.map(({ label, highlighted, ...rest }) => ({
    label: titleize(label),
    highlighted: titleize(highlighted),
    ...rest,
  }))

const BOOLEAN_REGEX = /( and | or |\(|\))/gi

export const isBooleanSearch = query => Boolean(query.match(BOOLEAN_REGEX))

export const parseBooleanSearch = booleanSearch => {
  const booleanQuery = booleanSearch.replace(BOOLEAN_REGEX, w => w.toUpperCase()) // turn and/or into AND/OR (needed by boolean-parser)
  const matches = parseBooleanQuery(booleanQuery)
  if (!matches) return booleanSearch

  const query = booleanSearch
  const optionalWords = matches
    .flat()
    .reduce(
      (words, word) => (matches.flat().indexOf(word) === matches.flat().lastIndexOf(word) ? [...words, word] : words),
      []
    )

  // console.log({ query, optionalWords })

  // return parsedQuery.map(match => match.join(' ').replaceAll(' ', '-')).join(' ')
  return { query, optionalWords }
}

export const getOptionalWords = query => query
