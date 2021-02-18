import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import api from '../services/api'

export interface ISignInCredentials {
  email: string
  password: string
}

interface IUser {
  id: string
  name: string
  email: string
  avatar_url: string
}

interface IAuthData {
  user: IUser
  token: string
}

interface IAuthContext {
  loading: boolean
  user: IUser
  signIn(credentials: ISignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: IUser): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState({} as IAuthData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user'])

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = 'Bearer ' + token[1]
        setAuthData({ token: token[1], user: JSON.parse(user[1]) })
      }

      setLoading(false)
    }
    loadStorageData()
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password })

    if (!response.data) return signOut()

    const { token, user } = response.data

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ])

    api.defaults.headers.authorization = 'Bearer ' + token

    setAuthData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])
    setAuthData({} as IAuthData)
  }, [])

  const updateUser = useCallback(
    async (user: IUser) => {
      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))
      setAuthData({
        token: authData.token || '',
        user,
      })
      console.log(user)
    },
    [authData.token]
  )

  return (
    <AuthContext.Provider value={{ signIn, signOut, updateUser, user: authData.user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
