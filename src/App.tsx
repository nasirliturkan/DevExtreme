import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Structure } from "./Structure";
import { structures } from "./Structure/data";

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
            <Structure structuresData={structures} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
