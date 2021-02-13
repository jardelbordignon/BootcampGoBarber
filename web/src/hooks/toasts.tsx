import { createContext, useContext, useCallback } from 'react'

import Toasts from '../components/Toasts'

interface IToastsContext {
  addToast(): void
  removeToast(): void
}

const ToastsContext = createContext<IToastsContext>({} as IToastsContext)

export const ToastsProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast')
  }, [])

  const removeToast = useCallback(() => {
    console.log('removeToast')
  }, [])

  return (
    <ToastsContext.Provider value={{ addToast, removeToast }}>
      {children}

      <Toasts />
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
