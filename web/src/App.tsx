import GlobalStyles from './styles/global'

import SignIn from './pages/SignIn'
import { AuthProvider } from './context/AuthContext'

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyles />
    </>
  )
}

export default App
