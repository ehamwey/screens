declare function require(name: string): string;
// tslint:disable-next-line
require("../../css/bus_eink.scss");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  AuditScreenPage,
  MultiScreenPage,
  ScreenPage
} from "Components/eink/bus/screen_page";

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/screen/bus_eink">
          <MultiScreenPage />
        </Route>
        <Route exact path="/audit/bus_eink">
          <AuditScreenPage />
        </Route>
        <Route path="/screen/:id">
          <ScreenPage />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));