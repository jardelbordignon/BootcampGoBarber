import { createContext, useContext, useCallback, useState } from 'react'
import { generate } from 'shortid'

import Toasts from '../components/Toasts'

export interface IToast {
  id: string
  title: string
  description?: string
  type?: 'info' | 'success' | 'error'
}

interface IToastsContext {
  addToast(toast: Omit<IToast, 'id'>): void
  removeToast(id: string): void
}

const ToastsContext = createContext<IToastsContext>({} as IToastsContext)

export const ToastsProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([])

  const addToast = useCallback(({ title, description, type }: Omit<IToast, 'id'>) => {
    const toast = { id: generate(), title, description, type }
    setToasts((state) => [...state, toast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((state) => state.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastsContext.Provider value={{ addToast, removeToast }}>
      {children}

      <Toasts toasts={toasts} />
    </ToastsContext.Provider>
  )
}

export function useToasts(): IToastsContext {
  const context = useContext(ToastsContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}
