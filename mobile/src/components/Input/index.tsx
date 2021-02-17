import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react'
import { TextInputProps } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useField } from '@unform/core'

import theme from '../../styles/theme.json'
import { Container, TextInput, Placeholder } from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

interface IinputValueRef {
  value: string
}

interface InputRef {
  focus(): void
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, placeholder, ...rest }, ref) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<IinputValueRef>({ value: defaultValue })
  const inputElementRef = useRef<any>(null)

  const [isActive, setIsActive] = useState(false)

  const onFocusHandler = useCallback(() => setIsActive(true), [])
  const onBlurHandler = useCallback(() => setIsActive(!!inputValueRef.current?.value), [])

  // passando a ref para o elemento pai
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    },
  }))

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
    <Container isActive={isActive}>
      <Icon name={icon} size={20} color={isActive ? theme.colors.primary : theme.colors.tertiary} />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onChangeText={(value) => (inputValueRef.current.value = value)}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        {...rest}
      />
      {placeholder && <Placeholder isActive={isActive}>{placeholder}</Placeholder>}
    </Container>
  )
}

export default forwardRef(Input)
