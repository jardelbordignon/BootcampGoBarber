import React from 'react'
import { Button } from 'react-native'

import { useAuth } from '../hooks/auth'
import { Box } from '../styles'

const Dashboard: React.FC = () => {
  const { signOut } = useAuth()

  return (
    <Box background="background">
      <Button title="Sair" onPress={signOut} />
    </Box>
  )
}

export default Dashboard
