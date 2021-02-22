import React, { useEffect, useState, useCallback, useRef } from 'react'
import { View } from 'react-native'
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

import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import api from '../../../services/api'
import getValidationsErrors from '../../../utils/getValidationsErrors'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { useAuth } from '../../../hooks/auth'
import { Container, Title, UserAvatarButton, UserAvatar } from './styles'

interface ISignUp {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const Profile: React.FC = () => {
  const nav = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const passwordConfirmationInputRef = useRef<TextInput>(null)
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user, updateUser } = useAuth()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardIsOpen(true))
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
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val) => !!val.length,
          then: Yup.string().min(6, 'Senha deve ter 6 dígitos ou +1234567'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Confirmação é obrigatória'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), ''], 'Confirmação diferente da nova senha'),
      })

      await schema.validate(data, { abortEarly: false })

      const { name, email, old_password, password, password_confirmation } = data

      const formData = {
        name, email,
        ...(old_password ? { old_password, password, password_confirmation } : {}),
      }

      setLoading(true)
      const response = await api.put('/profile', formData)

      updateUser(response.data)

      Alert.alert('Perfil atualizado com sucesso!')

      nav.goBack()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(error)
        formRef.current?.setErrors(errors)

        return
      }

      console.log(error)

      Alert.alert('Erro ao atualizar o perfil', 'Ocorreu um erro ao atualizar seu perfil, tente novamente')

    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <Container>

            {!keyboardIsOpen &&
              <UserAvatarButton onPress={() => {}}>
                <UserAvatar source={{ uri: user.avatar_url }} />
              </UserAvatarButton>
            }

            <View>
              <Title size={24}>Meu perfil</Title>
            </View>

            <Form ref={formRef} initialData={user} onSubmit={onSubmitHandler}>
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
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => passwordConfirmationInputRef.current?.focus()}
              />

              <Input
                ref={passwordConfirmationInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmação da senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button loading={loading} onPress={() => formRef.current?.submitForm()}>
                Salvar alterações
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export default Profile
