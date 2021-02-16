import { useState, useCallback, useMemo, useEffect } from 'react'
import { FiPower, FiUser, FiClock } from 'react-icons/fi'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { isToday, format, parseISO, isAfter } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { useAuth } from '../../hooks/auth'
import logo from '../../assets/logo.svg'
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Session,
  Appointment,
  Calendar,
} from './styles'
import api from '../../services/api'
import { Link } from 'react-router-dom'

interface IDayAvailability {
  day: number
  available: boolean
}

interface IAppointment {
  id: string
  date: string
  hourFormatted: string
  client: {
    name: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<IDayAvailability[]>([])
  const [appointments, setAppointments] = useState<IAppointment[]>([])

  const { signOut, user } = useAuth()

  const onDayClickHadler = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) setSelectedDate(day)
  }, [])

  const onMonthChangeHandler = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => setMonthAvailability(response.data))
  }, [currentMonth, user])

  useEffect(() => {
    api
      .get<IAppointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const formattedAppointments = response.data.map((appointment) => {
          return { ...appointment, hourFormatted: format(parseISO(appointment.date), 'HH:mm') }
        })
        setAppointments(formattedAppointments)
      })
  }, [selectedDate])

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), monthDay.day)
      })

    return dates
  }, [currentMonth, monthAvailability])

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, " dd 'de' MMMM", { locale: ptBR })
  }, [selectedDate])

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR })
  }, [selectedDate])

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => parseISO(appointment.date).getHours() < 12)
  }, [appointments])

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => parseISO(appointment.date).getHours() >= 12)
  }, [appointments])

  const nexAppointment = useMemo(() => {
    return appointments.find((appointment) => isAfter(parseISO(appointment.date), new Date()))
  }, [appointments])

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />
          <Profile>
            {user.avatar_url ? <img src={user.avatar_url} alt={user.name} /> : <FiUser />}
            <div>
              <span>Bem vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button onClick={() => signOut()}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>
              {isToday(selectedDate) ? 'Hoje - ' : 'Dia'}
              {selectedDateAsText}
            </span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nexAppointment && (
            <NextAppointment>
              <strong>Próximo agendamento</strong>
              <div>
                <img src={nexAppointment.client.avatar_url} />
                <strong>{nexAppointment.client.name}</strong>
                <span>
                  <FiClock />
                  {nexAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Session>
            <strong>Manhã</strong>
            {!morningAppointments.length && <p>Nenhum agendamento para esse período</p>}
            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img src={appointment.client.avatar_url} alt={appointment.client.name} />
                  <strong>{appointment.client.name}</strong>
                </div>
              </Appointment>
            ))}
          </Session>

          <Session>
            <strong>Tarde</strong>
            {!afternoonAppointments.length && <p>Nenhum agendamento para esse período</p>}
            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img src={appointment.client.avatar_url} alt={appointment.client.name} />
                  <strong>{appointment.client.name}</strong>
                </div>
              </Appointment>
            ))}
          </Session>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 1] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [2, 3, 4, 5, 6] } }}
            onDayClick={onDayClickHadler}
            selectedDays={selectedDate}
            onMonthChange={onMonthChangeHandler}
          />
        </Calendar>
      </Content>
    </Container>
  )
}

export default Dashboard
