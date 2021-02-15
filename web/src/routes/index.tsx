import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ConditionedRoute from '../routes/ConditionedRoute'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Forgot from '../pages/password/Forgot'
import Reset from '../pages/password/Reset'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <ConditionedRoute path="/" exact component={SignIn} />
      <ConditionedRoute path="/signup" component={SignUp} />
      <ConditionedRoute path="/password/forgot" component={Forgot} />
      <ConditionedRoute path="/password/reset" component={Reset} />

      <ConditionedRoute path="/dash" component={Dashboard} isPrivate />
    </Switch>
  </BrowserRouter>
)

export default Routes
