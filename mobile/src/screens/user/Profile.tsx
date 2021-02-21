import React from 'react'
import { Button } from 'react-native'

import { useAuth } from '../../hooks/auth'
import { Box, Title } from '../../styles'

const Profile: React.FC = () => {
  const { signOut } = useAuth()

  return (
    <Box background="background">
      <Title>Profile</Title>
      <Button title="Sair" onPress={() => signOut()} />
    </Box>
  )
}

export default Profile
