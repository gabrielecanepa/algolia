import NextImage from 'next/image'
import styled from 'styled-components'

const Image = styled(
  ({ height = '100%', width = '100%', layout = 'responsive', src, ...props }) => (
    <NextImage height={height} layout={layout} src={src} width={width} {...props} />
  )
)`
  object-fit: cover;
`

export default Image
