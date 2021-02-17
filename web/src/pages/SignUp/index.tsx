import { useCallback, useRef, useState } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCheck } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { useToasts } from '../../hooks/toasts'
import getValidationsErrors from '../../utils/getValidationsErrors'
import Button from '../../components/Button'
import Input from '../../components/Input'

import logo from '../../assets/logo.svg'

import { AnimatedContainer, Container, Content, Background } from './styles'

interface ISignUp {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToasts()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ISignUp) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
          password: Yup.string().min(6, 'Senha no mínimo 6 caracteres'),
        })

        await schema.validate(data, { abortEarly: false })

        setLoading(true)
        await api.post('/users', data)

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Faça seu login no GoBarber',
        })

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
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer seu cadastro. Tente novamente',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, history]
  )

  return (
    <Container>
      <Background />

      <Content>
        <AnimatedContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
            <Button icon={FiCheck} loading={loading}>
              Entrar
            </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft /> Voltar para o login
          </Link>
        </AnimatedContainer>
      </Content>
    </Container>
  )
}

export default SignUp
