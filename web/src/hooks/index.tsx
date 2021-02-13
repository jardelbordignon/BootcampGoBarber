import { AuthProvider } from './auth'
import { ToastsProvider } from './toasts'

const AppProviders: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastsProvider>{children}</ToastsProvider>
  </AuthProvider>
)

export default AppProviders
