import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Articles from './components/articles/Articles';
import Article from './components/article/Article';
import Posts from './components/posts/Posts';
import Rankings from './components/rankings/Rankings';
import AddBoxer from './components/boxer/AddBoxer';
import Boxer from './components/boxer/Boxer';
import EditBoxer from './components/boxer/EditBoxer';
import FindBoxer from './components/boxer/FindBoxer';
import Events from './components/events/Events';
import Event from './components/event/Event';
import AddEvent from './components/events/AddEvent';
import EditEvent from './components/event/EditEvent';
import AddBout from './components/bouts/AddBout';
import Bout from './components/bouts/Bout';
import PrivateRoute from './components/routing/PrivateRoute';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute exact path='/forum' component={Posts} />
              <Route exact path='/news' component={Articles} />
              <Route exact path='/news/:id' component={Article} />
              <Route exact path='/boxer/:id' component={Boxer} />
              <Route exact path='/rankings' component={Rankings} />
              <Route exact path='/events' component={Events} />
              <Route exact path='/event/:id' component={Event} />
              <Route exact path='/bout/:id' component={Bout} />
              <Route exact path='/find-boxer' component={FindBoxer} />
              <PrivateRoute exact path='/add-boxer' component={AddBoxer} />
              <PrivateRoute exact path='/add-event' component={AddEvent} />
              <PrivateRoute exact path='/add-bout' component={AddBout} />
              <PrivateRoute
                exact
                path='/edit-boxer/:id'
                component={EditBoxer}
              />
              <PrivateRoute
                exact
                path='/edit-event/:id'
                component={EditEvent}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
