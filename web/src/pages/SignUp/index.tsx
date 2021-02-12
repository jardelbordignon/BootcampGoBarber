import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'

import logo from '../../assets/logo.svg'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { Container, Content, Background } from './styles'

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logo} alt='GoBarber' />

      <form>
        <h1>Faça seu cadastro</h1>

        <Input name='email' icon={FiUser} placeholder='Nome' />
        <Input name='email' icon={FiMail} placeholder='E-mail' />
        <Input name='password' icon={FiLock} placeholder='Senha' type='password' />
        <Button>Entrar</Button>
      </form>

      <a href='register'> <FiArrowLeft /> Voltar para o login</a>
    </Content>
  </Container>
)

export default SignUp
