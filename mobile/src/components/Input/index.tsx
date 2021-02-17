import React, { useEffect, useRef } from 'react'
import { TextInputProps } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useField } from '@unform/core'

import { Container, TextInput, Placeholder } from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

interface IinputValueRef {
  value: string
}

const Input: React.FC<InputProps> = ({ name, icon, placeholder, ...rest }) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<IinputValueRef>({ value: defaultValue })
  const inputElementRef = useRef<any>(null)

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.setNativeProps({ text: '' })
      },
    })
  }, [fieldName, inputValueRef])

  return (
    <Container>
      <Icon name={icon} size={20} color="#ccc" />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onChangeText={(value) => (inputValueRef.current.value = value)}
        {...rest}
      />
      {placeholder && <Placeholder>{placeholder}</Placeholder>}
    </Container>
  )
}

export default Input
