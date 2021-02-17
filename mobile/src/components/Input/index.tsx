import React from 'react'
import { TextInputProps } from 'react-native'

import { Container, TextInput, Placeholder } from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

const Input: React.FC<InputProps> = ({ name, icon, placeholder, ...rest }) => {
  return (
    <Container>
      <TextInput keyboardAppearance="dark" {...rest} />
      {placeholder && <Placeholder>{placeholder}</Placeholder>}
    </Container>
  )
}

export default Input
