import React from 'react';
import AddTask from './screens/AddTask';
import Main from './screens/Main';
import './styles/css/App.css';
import Error404 from './screens/Error404';
import {
  withRouter,
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom';
import Header from './generic/Header';

class App extends React.Component {
  render() {
    let RoutedHeader = withRouter(Header);
    return (
      <>
        <Router>
          <RoutedHeader />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/add" component={AddTask} />
            <Route path="/404-error-page" component={Error404} />
            <Route>
              <Redirect to="/404-error-page"></Redirect>
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
