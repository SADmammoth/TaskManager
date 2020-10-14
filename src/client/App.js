import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import Header from './components/Header';
import TaskAssignmentPage from './screens/TaskAssignmentPage';
import CreateTaskPage from './screens/CreateTaskPage';
import Error404 from './screens/Error404';
import NewTaskList from './screens/NewTaskList';

import './assets/styles/App.scss';
import LoginPage from './screens/LoginPage';
import Preloader from './helpers/Preloader';

function App(props) {
  return (
    <Preloader>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={TaskAssignmentPage} />
          <Route path="/add" component={CreateTaskPage} />
          <Route path="/list" component={NewTaskList} />
          <Route path="/login" component={LoginPage} />
          <Route path="/404-error-page" component={Error404} />
          <Route path="*">
            <Redirect to="/404-error-page"></Redirect>
          </Route>
        </Switch>
      </Router>
    </Preloader>
  );
}

export default App;
