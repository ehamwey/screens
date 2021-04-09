declare function require(name: string): string;
// tslint:disable-next-line
require("../../../css/solari_large_v2.scss");

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScreenPage from "Components/v2/screen_page";
import { MappingContext } from "Components/v2/widget";

import NormalScreen from "Components/v2/solari/normal_screen";
import OverheadScreen from "Components/v2/solari/overhead_screen";
import TakeoverScreen from "Components/v2/takeover_screen";
import Placeholder from "Components/v2/placeholder";

const TYPE_TO_COMPONENT = {
  normal: NormalScreen,
  overhead: OverheadScreen,
  takeover: TakeoverScreen,
  placeholder: Placeholder,
};

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/v2/screen/:id">
          <MappingContext.Provider value={TYPE_TO_COMPONENT}>
            <ScreenPage />
          </MappingContext.Provider>
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
