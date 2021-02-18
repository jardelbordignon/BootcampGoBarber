import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from '../screens/appointment/Dashboard'
import CreateAppointment from '../screens/appointment/Create'
import ShowAppointment from '../screens/appointment/Show'
import Profile from '../screens/user/Profile'

import theme from '../styles/theme.json'

const { Navigator, Screen } = createStackNavigator()

const AppRoutes: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: theme.colors.background },
    }}
  >
    <Screen name="Dash" component={Dashboard} />
    <Screen name="CreateAppointment" component={CreateAppointment} />
    <Screen name="ShowAppointment" component={ShowAppointment} />

    <Screen name="Profile" component={Profile} />
  </Navigator>
)

export default AppRoutes
