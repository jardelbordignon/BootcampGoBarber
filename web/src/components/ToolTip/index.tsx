import { Container } from './styles'

interface ToolTipProps {
  title: string
  className?: string
}

const ToolTip: React.FC<ToolTipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      { children }
      <span className='title'>{ title }</span>
    </Container>
  )
}

export default ToolTip
