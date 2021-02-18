import React, { useCallback } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import { useAuth } from '../../../hooks/auth'
import Profile from '../../user/Profile'

import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar } from './styles'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()
  const { navigate } = useNavigation()
  const navToProfile = useCallback(() => navigate('Profile'), [navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => navToProfile()}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
    </Container>
  )
}

export default Dashboard
