import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import NotFound from './NotFound';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/companies">
        <Companies />
      </Route>
      <Route exact path="/companies/:handle">
        <Company />
      </Route>
      <Route exact path="/jobs">
        <Jobs />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route>
        <NotFound />
      </Route>

    </Switch>
  )
}

export default Routes;