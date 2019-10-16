import React from 'react';
import AddTask from './screens/AddTask';
import Main from './screens/Main';
import './styles/css/App.css';
import Error404 from './screens/Error404';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/add" component={AddTask} />
              <Route component={Error404} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
