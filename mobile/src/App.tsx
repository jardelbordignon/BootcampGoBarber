import 'react-native-gesture-handler'
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import AppProviders from './hooks'
import Routes from './routes'
import theme from './styles/theme.json'

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <SafeAreaView style={{ flex: 1 }}>
        <AppProviders>
          <Routes />
        </AppProviders>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
