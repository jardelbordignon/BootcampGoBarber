import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import api from '../../../services/api'
import { useAuth } from '../../../hooks/auth'
import theme from '../../../styles/theme.json'
import { Container, Header, BackButton, HeaderTitle, UserAvatar } from './styles'

interface RouteParams {
  providerId: string
}

export interface IProvider {
  id: string
  name: string
  avatar: string
}

const CreateAppointment: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([])
  const route = useRoute()
  const { providerId } = route.params as RouteParams
  const { user } = useAuth()
  const { goBack } = useNavigation()

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data)
    })
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color={theme.colors.white} />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  )
}

export default CreateAppointment
