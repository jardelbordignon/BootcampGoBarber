import { InputHTMLAttributes, useEffect, useState, useRef, useCallback } from 'react'
import { IconBaseProps } from 'react-icons'
import { useField } from '@unform/core'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string // possui todos os atributos de um input porém o nome é obrigatório
  icon: React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocus = useCallback(() => setIsFocused(true), [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      { Icon && <Icon size={20} /> }

      <input
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        placeholder=''
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      { rest.placeholder && <span>{rest.placeholder}</span> }
    </Container>
  )
}

export default Input
