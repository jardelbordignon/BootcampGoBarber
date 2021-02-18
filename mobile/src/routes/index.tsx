import React from 'react'
import { Image } from 'react-native'

import { useAuth } from '../hooks/auth'
import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

import logo from '../assets/logo.png'
import { Box } from '../styles'

const Routes: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Box background="background">
        <Image source={logo} />
      </Box>
    )
  }

  return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
