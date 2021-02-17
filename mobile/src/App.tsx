import React from 'react'
import { View, Text, StatusBar } from 'react-native'

import theme from './styles/theme.json'

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Text style={{ color: theme.colors.white }}>App</Text>
      </View>
    </>
  )
}

export default App
