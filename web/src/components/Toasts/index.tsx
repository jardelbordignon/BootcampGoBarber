import { useTransition } from 'react-spring'

import { IToast } from '../../hooks/toasts'
import Toast from './Toast'
import { Container } from './styles'

interface IToasts {
  toasts: IToast[]
}

const Toasts: React.FC<IToasts> = ({ toasts }) => {
  const toastsWithTransition = useTransition(toasts, (toast) => toast.id, {
    from: { right: '-110%', opacity: 0 },
    enter: { right: '0', opacity: 1 },
    leave: { right: '-110%', opacity: 0 },
  })

  return (
    <Container>
      {toastsWithTransition.map(({ key, item, props }) => (
        <Toast key={key} toast={item} style={props} />
      ))}
    </Container>
  )
}

export default Toasts
