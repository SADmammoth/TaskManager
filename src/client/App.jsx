import React from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import jssPluginGlobal from "jss-plugin-global";
import Header from "./components/Header";
import TaskAssignmentPage from "./screens/TaskAssignmentPage";
import CreateTaskPage from "./screens/CreateTaskPage";
import Error404 from "./screens/Error404";
import NewTaskList from "./screens/NewTaskList";
import theme from "./theme";
import { ThemeProvider } from "react-jss";

import LoginPage from "./screens/LoginPage";
import Preloader from "./helpers/Preloader";

import { jss } from "react-jss";
import styles from "./jss/global.styles";

function App(props) {
  return (
    <Preloader>
      <Router>
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </Router>
    </Preloader>
  );
}

jss.use(jssPluginGlobal());
jss.createStyleSheet(styles).attach();

export default App;
