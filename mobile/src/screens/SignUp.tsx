import React, { useState, useEffect } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { useNavigation } from '@react-navigation/native'

import Button from '../components/Button'
import Input from '../components/Input'

import logo from '../assets/logo.png'
import theme from '../styles/theme.json'
import { Box, Title, Spacer } from '../styles'

const SignUp = () => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false)
  const nav = useNavigation()

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

  return (
    <>
      <KeyboardAvoidingView enabled style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
          <Box paddingH={30}>
            {!keyboardIsOpen && (
              <>
                <Image source={logo} />
                <Spacer height={34} />
              </>
            )}

            <Title size={24}>Crie sua conta</Title>
            <Spacer height={24} />

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button
              onPress={() => {
                console.log('Deu')
              }}
            >
              Entrar
            </Button>
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
          <Spacer width={`${getBottomSpace()}px`} />
        </Box>
      )}
    </>
  )
}

export default SignUp
