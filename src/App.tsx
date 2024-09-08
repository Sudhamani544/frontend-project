import "./App.css";
import { Switch, Route } from "react-router-dom";
// import CountryTableContainer from "./extrafiles/CountryTableContainer";
// import CountryPage from "./components/CountryPage";
// import CartPage from "./components/CartPage";
import HomePage from "./components/pages/HomePage";
import CountryPage from "./components/pages/CountryPage";
import FavPage from "./components/pages/FavPage";
import { useSelector } from "react-redux";
import { Store } from "./redux/reducers";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route exact path="/country/:countryName">
        <CountryPage />
      </Route>
      <Route exact path="/cart">
        <FavPage />
      </Route>
    </Switch>
  );
}

export default App;
