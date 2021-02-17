import React from 'react'
import { TextInputProps } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { Container, TextInput, Placeholder } from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

const Input: React.FC<InputProps> = ({ name, icon, placeholder, ...rest }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#ccc" />
      <TextInput keyboardAppearance="dark" {...rest} />
      {placeholder && <Placeholder>{placeholder}</Placeholder>}
    </Container>
  )
}

export default Input
