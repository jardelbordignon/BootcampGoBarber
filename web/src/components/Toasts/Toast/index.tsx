import { useEffect } from 'react'
import { FiInfo, FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi'

import ProgressBar from '../../ProgressBar'
import { IToast, useToasts } from '../../../hooks/toasts'
import { Container } from './styles'

interface IToastProps {
  toast: IToast
  style: { [key: string]: any }
}

const icons = {
  info: <FiInfo size={20} />,
  error: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />,
}

const Toast: React.FC<IToastProps> = ({ toast, style }) => {
  const { removeToast } = useToasts()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, toast.id])

  return (
    <Container type={toast.type} style={style}>
      {icons[toast.type || 'info']}
      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
        <ProgressBar percent="75%" />
      </div>
      <button onClick={() => removeToast(toast.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast
