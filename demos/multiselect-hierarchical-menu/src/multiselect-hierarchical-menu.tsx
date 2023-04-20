import { useConnector } from 'react-instantsearch-hooks-web'

import type { SearchResults } from 'algoliasearch-helper'
import type { Connector } from 'instantsearch.js'
import type { AdditionalWidgetProperties } from 'react-instantsearch-hooks-web'
import { useCallback, useMemo, useState } from 'react'

import { cx } from './utils'

// Types

type MultiselectHierarchicalMenuItem = SearchResults.FacetValue & { label: string }

type MultiselectHierarchicalMenuLevel = {
  attribute: string
  items: MultiselectHierarchicalMenuItem[]
  refine: (value: string) => void
}

type MultiselectHierarchicalMenuRender = {
  levels: MultiselectHierarchicalMenuLevel[]
}

type MultiselectHierarchicalMenuState = {
  levels: MultiselectHierarchicalMenuLevel[]
  refinements: string[]
}

type MultiselectHierarchicalMenuWidget = {
  $$type: string
  renderState: MultiselectHierarchicalMenuRender
  indexRenderState: {
    multiselectHierarchicalMenu: MultiselectHierarchicalMenuRender
  }
  indexUiState: {
    multiselectHierarchicalMenu: MultiselectHierarchicalMenuRender
  }
}

export type MultiselectHierarchicalMenuParams = {
  attributes: string[]
  separator?: string
}

// Connector

export type MultiselectHierarchicalMenuConnector = Connector<MultiselectHierarchicalMenuWidget, MultiselectHierarchicalMenuParams>

export const connectMultiselectHierarchicalMenu: MultiselectHierarchicalMenuConnector = (renderFn, unmountFn = () => {}) => {
  return widgetParams => {
    const { attributes, separator } = widgetParams

    // Store information that needs to be shared across multiple method calls.
    const connectorState: MultiselectHierarchicalMenuState = {
      levels: [],
      refinements: [],
    }

    return {
      $$type: 'ais.multiselectHierarchicalMenu',
      getWidgetRenderState({ helper, results }) {
        // When there are no results, return the API with default values.
        if (!results) {
          return { levels: [], widgetParams }
        }

        // Get the last refinement.
        const newRefinement = results.getRefinements().pop()?.attributeName

        // Merge the results items with the initial ones.
        const getItems = (attribute: string): MultiselectHierarchicalMenuItem[] => {
          const facetValues = results.getFacetValues(attribute, { sortBy: ['name:asc'] }) as SearchResults.FacetValue[]
          const resultsItems = facetValues.map(facetValue => ({ ...facetValue, label: facetValue.name.split(separator).pop() }))

          if (newRefinement && !attributes.includes(newRefinement)) return resultsItems

          const levelItems = connectorState.levels.find(level => level.attribute === attribute).items

          if (!levelItems.length && resultsItems.length) return resultsItems
          if (!resultsItems.length) return levelItems

          const mergedItems = levelItems.map(levelItem => {
            const resultsItem = resultsItems.find(resultItem => resultItem.name === levelItem.name)
            return resultsItem ? { ...levelItem, ...resultsItem } : levelItem
          })

          return mergedItems.sort((a, b) => a.name.localeCompare(b.name))
        }

        // Register refinements and items for each attribute.
        for (const [i, attribute] of attributes.entries()) {
          if (!connectorState.levels[i]) {
            const refine = value => {
              for (const a of attributes) {
                const isLastAttribute = attribute === attributes[ attributes.length - 1 ] && attribute === a
                if (!isLastAttribute && helper.getRefinements(a).length > 0) {
                  helper.clearRefinements(a)
                }
              }
              const refinement = helper.getRefinements(attribute).find(ref => ref.value === value)
              refinement ? helper.removeDisjunctiveFacetRefinement(attribute, value) : helper.addDisjunctiveFacetRefinement(attribute, value)
              helper.search()
            }
            connectorState.levels[i] = { attribute, refine, items: [] }
          }

          // Register the initial items.
          if (results && !connectorState.levels[i].items.length) {
            connectorState.levels[i].items = getItems(attribute)
          }
        }

        // Call the getItems to get the updated items state.
        const levels = connectorState.levels.map(level => ({ ...level, items: getItems(level.attribute) }))

        return { levels, widgetParams }
      },
      getRenderState(renderState, renderOptions) {
        return {
          ...renderState,
          multiselectHierarchicalMenu: {
            ...renderState.multiselectHierarchicalMenu,
            ...this.getWidgetRenderState(renderOptions),
          },
        }
      },
      init(initOptions) {
        const { instantSearchInstance } = initOptions
        renderFn({ ...this.getWidgetRenderState(initOptions), instantSearchInstance }, false)
      },
      render(renderOptions) {
        const { instantSearchInstance } = renderOptions
        renderFn({ ...this.getWidgetRenderState(renderOptions), instantSearchInstance }, false)
      },
      dispose() {
        unmountFn()
      },
      getWidgetUiState(uiState, { searchParameters }) {
        return {
          ...uiState,
          multiselectHierarchicalMenu: {
            ...uiState.multiselectHierarchicalMenu,
            ...attributes.map(attribute => ({
              [attribute]: searchParameters.getDisjunctiveRefinements(attribute),
            })),
          },
        }
      },
      getWidgetSearchParameters(searchParameters) {
        return searchParameters
      },
    }
  }
}

// Hook

export const useMultiselectHierarchicalMenu = (
  props: MultiselectHierarchicalMenuParams,
  additionalWidgetProperties?: AdditionalWidgetProperties,
): MultiselectHierarchicalMenuState => {
  return useConnector(connectMultiselectHierarchicalMenu, props, additionalWidgetProperties) as MultiselectHierarchicalMenuState
}

// Component

type MultiselectHierarchicalMenuElementProps = {
  levels: MultiselectHierarchicalMenuLevel[]
  index?: number
  item?: SearchResults.FacetValue & { label: string }
}

const MultiselectHierarchicalMenuItem = ({ levels, index, item }: MultiselectHierarchicalMenuElementProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { refine }: MultiselectHierarchicalMenuLevel = useMemo(() => levels[ index ], [levels, index])

  const subLevelItems = useMemo(() => {
    const subLevel = levels[index + 1]
    if (!subLevel) return []
    return subLevel.items.filter(subItem => subItem.name.startsWith(item.name))
  }, [levels, index, item])

  const hasSubLevel: boolean = useMemo(() => subLevelItems.length > 0, [levels, index])

  const isSubLevelRefined: boolean = useMemo(() => subLevelItems.some(subItem => subItem.isRefined), [levels, index])

  const onButtonClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const onLabelClick = useCallback(() => {
    if (item.isRefined && isOpen && !isSubLevelRefined) {
      setIsOpen(false)
      refine(item.name)
      return
    }
    setIsOpen(hasSubLevel || !isOpen)
    refine(item.name)
  }, [item, isOpen, hasSubLevel, isSubLevelRefined])

  return (
    <li className="ais-MultiselectHierarchicalMenu-item">
      {hasSubLevel ? <button onClick={onButtonClick} className="ais-MultiselectHierarchicalMenu-toggle">{isOpen ? '▾' : '▸'}</button> : <span className="ais-MultiselectHierarchicalMenu-toggle"></span>}
      <span onClick={onLabelClick} className={cx('ais-MultiselectHierarchicalMenu-label', item.isRefined && 'ais-MultiselectHierarchicalMenu-label--active')}>
        {item.label}
      </span>
      {hasSubLevel && isOpen && <MultiselectHierarchicalMenuList levels={levels} index={index + 1} item={item} />}
    </li>
  )
}

const MultiselectHierarchicalMenuList = ({ levels, index = 0, item }: MultiselectHierarchicalMenuElementProps): JSX.Element => {
  const levelItems = useMemo(() => levels[index].items.filter(levelItem => !item || levelItem.name.startsWith(item.name)), [levels, index, item])

  return (
    <ul className="ais-MultiselectHierarchicalMenu-list">
      {levelItems.map(levelItem => <MultiselectHierarchicalMenuItem key={levelItem.name} levels={levels} index={index} item={levelItem} />)}
    </ul>
  )
}

export const MultiselectHierarchicalMenu = ({ attributes, separator = ' > ' }: MultiselectHierarchicalMenuParams): JSX.Element => {
  const { levels } = useMultiselectHierarchicalMenu({ attributes, separator })

  return (
    <div className="ais-MultiselectHierarchicalMenu">
      {levels.length > 0 && <MultiselectHierarchicalMenuList levels={levels} />}
    </div>
  )
}