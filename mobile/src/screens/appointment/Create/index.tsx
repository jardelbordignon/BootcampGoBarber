import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Platform, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

import api from '../../../services/api'
import { useAuth } from '../../../hooks/auth'
import theme from '../../../styles/theme.json'
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Avatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText
} from './styles'

interface RouteParams {
  providerId: string
}

export interface IProvider {
  id: string
  name: string
  avatar: string
}

interface IAvailabilityItem {
  hour: number
  available: boolean
}

const CreateAppointment: React.FC = () => {
  const route = useRoute()
  const routeParams = route.params as RouteParams
  const { user } = useAuth()
  const { goBack, navigate } = useNavigation()
  const [providers, setProviders] = useState<IProvider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availability, setAvailability] = useState<IAvailabilityItem[]>([])
  const [selectedHour, setSelectedHour] = useState(0)


  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`/providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then((response) => setAvailability(response.data))
  }, [selectedDate, selectedProvider])

  const selectProviderHandler = useCallback((providerId: string) => {
    setSelectedProvider(providerId)
  }, [])

  const toggleDatePickerHandler = useCallback(() => {
    setShowDatePicker(state => !state)
  }, [])

  const onChangeDatePickerHandler = useCallback((event: Event, date?: Date | undefined) => {
    if (Platform.OS === 'android') setShowDatePicker(false)
    if (date) setSelectedDate(date)
  }, [])

  const selectedHourHandler = useCallback((hourNumber) => {
    setSelectedHour(hourNumber)
  }, [])

  const createAppointmentHandler = useCallback(async() => {
    try {
      const date = new Date(selectedDate)
      date.setHours(selectedHour)
      date.setMinutes(0)

      await api.post('/appointments', { provider_id: selectedProvider, date })

      navigate('ShowAppointment', { date: date.getTime() })
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Erro ao criar o agendamento',
        'Ocorreu um erro ao criar o agendamento, tente novamente'
      )
    }
  }, [selectedDate, selectedHour, selectedProvider, navigate])

  const morningAvailability = useMemo(() => (
    availability
      .filter(({hour}) => hour < 12)
      .map(({hour, available}) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00')
      }))
  ), [availability])

  const afternoonAvailability = useMemo(() => (
    availability
      .filter(({hour}) => hour >= 12)
      .map(({hour, available}) => ({
        hour,
        available,
        formattedHour: format(new Date().setHours(hour), 'HH:00')
      }))
  ), [availability])


  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color={theme.colors.white} />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <Avatar source={{ uri: user.avatar_url }} />
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={(provider) => provider.id}
            renderItem={({ item: provider, index }) => {
              const selected = selectedProvider === provider.id
              return(
                <ProviderContainer key={index} selected={selectedProvider === provider.id} onPress={() => selectProviderHandler(provider.id)}>
                  {provider.avatar_url && <Avatar size={32} source={{ uri: provider.avatar_url }} />}
                  <ProviderName selected={selected}>{provider.name}</ProviderName>
                </ProviderContainer>
              )
            }}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>
          <OpenDatePickerButton onPress={toggleDatePickerHandler}>
            <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
          </OpenDatePickerButton>
          { showDatePicker &&
            <DateTimePicker
              {...(Platform.OS === 'ios' && { textColor: '#f4ede8' })} // < nessa linha
              mode="date"
              display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
              onChange={onChangeDatePickerHandler}
              value={selectedDate}

            />
          }
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              { morningAvailability.map(({ formattedHour, hour, available }) => (
                <Hour
                  key={formattedHour}
                  available={available}
                  enabled={available}
                  onPress={() => selectedHourHandler(hour)}
                  selected={selectedHour === hour}>
                  <HourText>{formattedHour}</HourText>
                </Hour>
              )) }
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              { afternoonAvailability.map(({ formattedHour, hour, available }) => (
                <Hour
                  key={formattedHour}
                  available={available}
                  enabled={available}
                  onPress={() => selectedHourHandler(hour)}
                  selected={selectedHour === hour}>
                  <HourText selected={selectedHour === hour}>{formattedHour}</HourText>
                </Hour>
              )) }
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={createAppointmentHandler}>
          <CreateAppointmentButtonText>
            Agendar
          </CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>

    </Container>
  )
}

export default CreateAppointment
