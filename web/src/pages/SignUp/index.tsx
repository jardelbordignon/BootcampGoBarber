import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'

import logo from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Content, Background } from './styles'

const SignUp: React.FC = () => {
  function handleSubmit(data: any): void {
    console.log(data)
  }

  return (
    <Container>
      <Background />

      <Content>
        <img src={logo} alt='GoBarber' />

        <Form initialData={{ name: 'Jardel' }} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name='name' icon={FiUser} placeholder='Nome' />
          <Input name='email' icon={FiMail} placeholder='E-mail' />
          <Input name='password' icon={FiLock} placeholder='Senha' type='password' />
          <Button>Entrar</Button>
        </Form>

        <a href='register'> <FiArrowLeft /> Voltar para o login</a>
      </Content>
    </Container>
  )
}

export default SignUp
