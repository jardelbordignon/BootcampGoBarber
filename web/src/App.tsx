import GlobalStyles from './styles/global'

import AppProviders from './hooks'
import Routes from './routes'

const App: React.FC = () => {
  return (
    <>
      <AppProviders>
        <Routes />
      </AppProviders>

      <GlobalStyles />
    </>
  )
}

export default App
