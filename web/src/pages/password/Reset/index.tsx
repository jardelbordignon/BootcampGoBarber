import { useCallback, useRef, useState } from 'react'
import { FiLock, FiCheck } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import { useToasts } from '../../../hooks/toasts'
import getValidationsErrors from '../../../utils/getValidationsErrors'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

import logo from '../../../assets/logo.svg'

import { AnimatedContainer, Container, Content, Background } from './styles'
import api from '../../../services/api'

interface IResetPassword {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToasts()

  const handleSubmit = useCallback(
    async (data: IResetPassword) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          password: Yup.string().required('Senha é obrigatória'),
          password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Confirmação diferente da senha'),
        })
        await schema.validate(data, { abortEarly: false })

        const { password, password_confirmation } = data
        const token = window.location.search.replace('?token=', '')

        if (!token) {
          throw new Error('Token não existe')
        }

        setLoading(true)
        await api.post('/password/reset', { password, password_confirmation, token })

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error)
          formRef.current?.setErrors(errors)
          return
        }
        // trigger a toast
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input name="password" icon={FiLock} placeholder="Nova senha" type="password" />

            <Input name="password_confirmation" icon={FiLock} placeholder="Confirmação da senha" type="password" />

            <Button icon={FiCheck} loading={loading}>
              Entrar
            </Button>

            <Link to="forgot">Alterar senha</Link>
          </Form>
        </AnimatedContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default ResetPassword
