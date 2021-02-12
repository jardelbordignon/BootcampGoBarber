import { InputHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string // possui todos os atributos de um input porém o nome é obrigatório
  icon: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    { Icon && <Icon size={20} /> }
    <input {...rest} placeholder='' />
    <span>{rest.placeholder}</span>
  </Container>
)

export default Input
