import { useCallback, useRef } from 'react'

/**
 * Hook to control the focus on the passed ref.
 */
const useFocus = () => {
  const ref = useRef(null)

  const setFocus = useCallback((focus = true) => {
    if (ref.current) {
      focus ? ref.current.focus() : ref.current.blur()
    }
  }, [])

  return [ref, setFocus]
}

export default useFocus
