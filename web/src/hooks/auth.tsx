import { createContext, useCallback, useState, useContext } from 'react'

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

interface IAuthContext {
  user: IUser
  signIn(credentials: ISignInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('@GoBarber:token')
    const user = localStorage.getItem('@GoBarber:user')

    if (token && user) {
      api.defaults.headers.authorization = 'Bearer ' + token
      return { token, user: JSON.parse(user) }
    }

    return {}
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password })

    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    api.defaults.headers.authorization = 'Bearer ' + token

    setAuthData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')
    setAuthData({})
  }, [])

  return <AuthContext.Provider value={{ signIn, signOut, user: authData.user }}>{children}</AuthContext.Provider>
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
