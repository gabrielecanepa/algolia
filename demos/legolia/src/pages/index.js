import { useEffect, useSearch } from '@/hooks'

const Home = () => {
  const { value, setValue, expanded, setExpanded, open, setOpen } = useSearch()

  useEffect(() => {
    setOpen(false)
    setExpanded(false)
    setValue('')
  }, [setExpanded, setOpen, setValue])

  return (
    <>
      <p>{`Query: ${value}`}</p>
      <p>{`Expanded: ${expanded}`}</p>
      <p>{`Open: ${open}`}</p>
    </>
  )
}

export default Home
