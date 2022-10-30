import styled from 'styled-components'
import { getHighlightedParts, getPropertyByPath } from 'instantsearch.js/es/lib/utils'

const Mark = styled.mark`
  background-color: transparent;
  font-weight: 600;
`

const Highlight = ({ attribute, hit }) => {
  const { value: attributeValue = '' } = getPropertyByPath(hit._highlightResult, attribute) || {}
  const parts = getHighlightedParts(attributeValue)

  return parts.map((part, i) =>
    part.isHighlighted ? <Mark key={i}>{part.value}</Mark> : part.value
  )
}

export default Highlight
