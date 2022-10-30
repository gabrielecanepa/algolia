import { useCallback, useEffect } from 'react'

/**
 * Hook that capture clicks outside of the passed ref.
 */
const useClickOut = (ref, fn) => {
  const onClickOut = useCallback(
    e => {
      if (ref?.current && !ref.current.contains(e.target)) fn()
    },
    [fn, ref]
  )

  useEffect(() => {
    document.addEventListener('mousedown', onClickOut)
    return () => {
      document.removeEventListener('mousedown', onClickOut)
    }
  }, [onClickOut])
}

export default useClickOut
