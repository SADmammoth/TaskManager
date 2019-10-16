import React from 'react';
import AddTask from './screens/AddTask';
import Main from './screens/Main';
import Error404 from './screens/Error404';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './generic/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

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
