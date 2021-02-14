import { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import { useAuth, ISignInCredentials } from '../../hooks/auth'
import { useToasts } from '../../hooks/toasts'
import getValidationsErrors from '../../utils/getValidationsErrors'
import Button from '../../components/Button'
import Input from '../../components/Input'

import logo from '../../assets/logo.svg'

import { AnimatedContainer, Container, Content, Background } from './styles'

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { signIn } = useAuth()
  const { addToast } = useToasts()

  const handleSubmit = useCallback(
    async (data: ISignInCredentials) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
          password: Yup.string().required('Senha é obrigatória'),
        })

        await schema.validate(data, { abortEarly: false })

        await signIn({
          email: data.email,
          password: data.password,
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(error)
          formRef.current?.setErrors(errors)
          return
        }
        // trigger a toast
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login',
        })
      }
    },
    [signIn, addToast]
  )

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
            <Button>Entrar</Button>

            <Link to="forgot">Esqueci minha senha</Link>
          </Form>

          <Link to="signup">
            <FiLogIn /> Criar conta
          </Link>
        </AnimatedContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
