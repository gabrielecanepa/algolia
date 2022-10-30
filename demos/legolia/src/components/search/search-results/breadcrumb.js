import styled from 'styled-components'
import { Link } from '@/components'

const Breadcrumb = styled(props => (
  <div {...props}>
    <span>
      <Link to="/">{'Home'}</Link>
    </span>
    &nbsp;
    <span>{'>'}</span>
    &nbsp;
    <span>{'Search'}</span>
  </div>
))`
  max-width: 100rem;
  margin: 0px auto;
  padding: 0.75rem 0;
  font-size: 0.875rem;
  line-height: 1.563rem;
  display: flex;

  span {
    color: inherit;
    font-weight: 400;

    &:nth-child(2) {
      color: #999;
    }
  }
`

export default Breadcrumb
