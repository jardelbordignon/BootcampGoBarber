import React, { useEffect, useState, useCallback } from 'react'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import api from '../../../services/api'
import { useAuth } from '../../../hooks/auth'
import theme from '../../../styles/theme.json'
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Avatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderName,
} from './styles'

interface RouteParams {
  providerId: string
}

export interface IProvider {
  id: string
  name: string
  avatar: string
}

const CreateAppointment: React.FC = () => {
  const route = useRoute()
  const routeParams = route.params as RouteParams
  const { user } = useAuth()
  const { goBack } = useNavigation()
  const [providers, setProviders] = useState<IProvider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId)

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data)
    })
  }, [])

  const selectProviderHandler = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color={theme.colors.white} />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <Avatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={selectedProvider === provider.id}
              onPress={() => selectProviderHandler(provider.id)}
            >
              {provider.avatar_url && <Avatar size={32} source={{ uri: provider.avatar_url }} />}
              <ProviderName selected={selectedProvider === provider.id}>{provider.name}</ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
    </Container>
  )
}

export default CreateAppointment
