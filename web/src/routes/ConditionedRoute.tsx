import { RouteProps, Route, Redirect } from 'react-router-dom'

import { useAuth } from '../hooks/auth'

interface ConditionedRouteProps extends RouteProps {
  isPrivate?: boolean
  component: React.ComponentType
}

// private | logged
//    true | true  = OK
//    true | false = Redirect to SignIn
//   false | true  = Redirect to Dashboard
//   false | false = Ok

const ConditionedRoute: React.FC<ConditionedRouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth()

  const allowAccess = isPrivate === !!user

  return (
    <Route
      {...rest}
      render={({ location }) =>
        allowAccess ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dash',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default ConditionedRoute
