import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Structure } from "./components/Structure";
import {data} from './mock/data.json'

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/structure" />;
            }}
          />
          <Route exact path="/structure">
            <Structure structuresData={data} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
