import React from 'react'
import { Image } from 'react-native'

import Button from '../../components/Button'
import Input from '../../components/Input'

import logo from '../../assets/logo.png'
import { Box, Title, Spacer } from '../../styles'

const SignIn = () => {
  return (
    <Box paddingH={20}>
      <Image source={logo} />

      <Spacer height={64} />
      <Title size={24}>Faça seu login</Title>
      <Spacer height={24} />

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
  )
}

export default SignIn
