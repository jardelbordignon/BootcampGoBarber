import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import api from '../../../services/api'
import { useAuth } from '../../../hooks/auth'
import theme from '../../../styles/theme.json'

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles'

export interface IProvider {
  id: string
  name: string
  avatar: string
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([])
  const { user } = useAuth()
  const { navigate } = useNavigation()

  const navToProfile = useCallback(() => {
    navigate('Profile')
  }, [navigate])

  const navToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId })
    },
    [navigate]
  )

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data)
    })
  }, [])

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

      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={<ProvidersListTitle>Cabeleireiros</ProvidersListTitle>}
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => navToCreateAppointment(provider.id)}>
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name="calendar" size={14} color={theme.colors.primary} />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name="clock" size={14} color={theme.colors.primary} />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  )
}

export default Dashboard
