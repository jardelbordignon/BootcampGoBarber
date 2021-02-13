import { IToast } from '../../hooks/toasts'
import Toast from './Toast'
import { Container } from './styles'

interface IToasts {
  toasts: IToast[]
}

const Toasts: React.FC<IToasts> = ({ toasts }) => {
  return (
    <Container>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </Container>
  )
}

export default Toasts
