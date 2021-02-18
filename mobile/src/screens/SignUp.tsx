import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import getValidationsErrors from '../utils/getValidationsErrors'
import Button from '../components/Button'
import Input from '../components/Input'

import logo from '../assets/logo.png'
import theme from '../styles/theme.json'
import { Box, Title, Spacer } from '../styles'

interface ISignUp {
  name: string
  email: string
  password: string
}

const SignUp = () => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)
  const nav = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //quando abrir o keyborad
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardIsOpen(true))
    //quando fechar o keyborad
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardIsOpen(false))

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const onSubmitHandler = useCallback(async (data: ISignUp) => {
    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
        password: Yup.string().required('Senha é obrigatória'),
      })

      await schema.validate(data, { abortEarly: false })

      setLoading(true)

      // await signIn({
      //   email: data.email,
      //   password: data.password,
      // })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(error)
        formRef.current?.setErrors(errors)
        return
      }

      Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, confira suas credenciais')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <Box paddingH={30}>
            {!keyboardIsOpen && (
              <>
                <Image source={logo} />
                <Spacer height="34px" />
              </>
            )}

            <Title size={24}>Crie sua conta</Title>
            <Spacer height="24px" />

            <Form ref={formRef} onSubmit={onSubmitHandler}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button loading={loading} onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>

      {!keyboardIsOpen && (
        <Box paddingV={5} absolute bottom={0} left={0} right={0} background="secondary">
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Box row>
              <Icon name="arrow-left" size={20} color={theme.colors.white} />
              <Spacer width="10px" />
              <Title color="white">Voltar para login</Title>
            </Box>
          </TouchableOpacity>
          <Spacer height={`${getBottomSpace()}px`} />
        </Box>
      )}
    </>
  )
}

export default SignUp
