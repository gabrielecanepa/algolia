import { createGlobalState } from 'react-hooks-global-state'
import { useMemo } from 'react'
import { useRouter } from 'next/router'

const initialState = {
  value: '',
  expanded: false,
  open: false,
}

const { useGlobalState } = createGlobalState(initialState)

/**
 * Hook to retrieve and update the search state.
 */
const useSearch = () => {
  const router = useRouter()
  const [value, setValue] = useGlobalState('value')
  const [expanded, setExpanded] = useGlobalState('expanded')
  const [open, setOpen] = useGlobalState('open')

  const isSearchPage = useMemo(() => router.pathname === '/search', [router.pathname])

  return {
    value,
    setValue,
    expanded,
    setExpanded,
    open,
    setOpen,
    isSearchPage,
  }
}

export default useSearch
