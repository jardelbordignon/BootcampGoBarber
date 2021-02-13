import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

import { Container, Toast } from './styles'

const Toasts: React.FC = () => {
  return (
    <Container>
      <Toast>
        <FiAlertCircle size={20} />
        <div>
          <strong>Deu erro</strong>
          <p>Uma descrição do erro</p>
        </div>
        <button>
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast type="success">
        <FiAlertCircle size={20} />
        <div>
          <strong>Deu erro</strong>
        </div>
        <button>
          <FiXCircle size={18} />
        </button>
      </Toast>

      <Toast type="error">
        <FiAlertCircle size={20} />
        <div>
          <strong>Deu erro</strong>
          <p>Uma descrição do erro</p>
        </div>
        <button>
          <FiXCircle size={18} />
        </button>
      </Toast>
    </Container>
  )
}

export default Toasts
