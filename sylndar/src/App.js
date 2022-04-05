import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { SellCar } from "./pages/SellCar";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/SellCar" exact component={SellCar} />
    </Switch>
  </BrowserRouter>
);

export default App;
