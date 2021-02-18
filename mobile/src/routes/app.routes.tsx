import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Dashboard from '../screens/Dashboard'

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
  </Navigator>
)

export default AppRoutes
