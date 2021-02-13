import GlobalStyles from './styles/global'

import SignIn from './pages/SignIn'
import AppProviders from './hooks'

const App: React.FC = () => {
  return (
    <>
      <AppProviders>
        <SignIn />
      </AppProviders>

      <GlobalStyles />
    </>
  )
}

export default App
