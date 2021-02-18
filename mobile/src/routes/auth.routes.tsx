import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../screens/auth/SignIn'
import SignUp from '../screens/auth/SignUp'
import theme from '../styles/theme.json'

const { Navigator, Screen } = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: theme.colors.background },
    }}
  >
    <Screen name="SignIn" component={SignIn} />
    <Screen name="SignUp" component={SignUp} />
  </Navigator>
)

export default AuthRoutes
