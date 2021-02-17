import { useCallback, useRef, useState } from 'react'
import { FiArrowLeft, FiMail, FiCheck } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import api from '../../../services/api'
import { useToasts } from '../../../hooks/toasts'
import getValidationsErrors from '../../../utils/getValidationsErrors'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

import logo from '../../../assets/logo.svg'

import { AnimatedContainer, Container, Content, Background } from './styles'

interface IForgotPassword {
  email: string
}
const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToasts()

  const handleSubmit = useCallback(
    async (data: IForgotPassword) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
        })

        await schema.validate(data, { abortEarly: false })

        // recuperação de senha
        setLoading(true)
        await api.post('/password/forgot', { email: data.email })

        addToast({
          type: 'success',
          title: 'E-mail de recuperação de senha enviado',
          description: 'Enviamos um e-mail para recuperação de senha, cheque sua caixa de entrada',
        })

        history.push('/')
      } catch (error) {
        console.log(error)
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error)
          formRef.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description: `Ocorreu um erro ao realizar a recuperação de senha, tente novamente ${error}`,
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
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button icon={FiCheck} loading={loading}>
              Recuperar
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft /> Voltar para o login
          </Link>
        </AnimatedContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default ForgotPassword
