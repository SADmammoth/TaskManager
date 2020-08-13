import React from 'react';
import {
  withRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import Header from './generic/Header';
import TaskAssignmentPage from './screens/TaskAssignmentPage';
import CreateTaskPage from './screens/CreateTaskPage';
import Error404 from './screens/Error404';

import './styles/scss/App.scss';
import LoginPage from './screens/LoginPage';
import Preloader from '../helpers/Preloader';

class App extends React.Component {
  render() {
    let RoutedHeader = withRouter(Header);
    return (
      <Preloader>
        <Router>
          <RoutedHeader />
          <Switch>
            <Route exact path="/" component={TaskAssignmentPage} />
            <Route path="/add" component={CreateTaskPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/404-error-page" component={Error404} />
            <Route>
              <Redirect to="/404-error-page"></Redirect>
            </Route>
          </Switch>
        </Router>
      </Preloader>
    );
  }
}

export default App;
