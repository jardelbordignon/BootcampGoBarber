import { createContext, useCallback, useState } from 'react'

import api from '../services/api'

export interface SignInCredentials {
  email: string
  password: string
}

interface IAuthContext {
  user: { [key: string]: any }
  signIn(credentials: SignInCredentials): Promise<void>
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const token = localStorage.getItem('@GoBarber:token')
    const user = localStorage.getItem('@GoBarber:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return { token: '', user: {} }
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password })

    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    setAuthData({ token, user })
  }, [])

  return <AuthContext.Provider value={{ signIn, user: authData.user }}>{children}</AuthContext.Provider>
}
