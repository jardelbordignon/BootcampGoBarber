import { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

import getValidationsErrors from '../../utils/getValidationsErrors'
import Button from '../../components/Button'
import Input from '../../components/Input'

import logo from '../../assets/logo.svg'

import { AnimatedContainer, Container, Content, Background } from './styles'

interface Props {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: Props) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
        password: Yup.string().min(6, 'Senha no mínimo 6 caracteres'),
      })

      await schema.validate(data, { abortEarly: false })
    } catch (error) {
      console.log(error)

      const errors = getValidationsErrors(error)
      formRef.current?.setErrors(errors)
    }
  }, [])

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
            <Button>Entrar</Button>
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
