import React from 'react';
import AddTask from './screens/AddTask';
import { Route, BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={AddTask} />
          <Route path="/add" component={AddTask} />
        </div>
      </Router>
    );
  }
}

export default App;
