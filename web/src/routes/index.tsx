import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ConditionedRoute from '../routes/ConditionedRoute'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <ConditionedRoute path="/" exact component={SignIn} />
      <ConditionedRoute path="/signup" component={SignUp} />

      <ConditionedRoute path="/dash" component={Dashboard} isPrivate />
    </Switch>
  </BrowserRouter>
)

export default Routes
