import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { DogList } from "./components/DogList/DogList";
import { DogDetail } from "./components/DogDetail/DogDetail";

import "./assets/scss/main.scss";

function App() {

  return (
    <div className="wrapper">
        <h1><a href="/">DogFinder <span className="city">Chicago</span></a></h1>
        <Router>
            <Switch>
                <Route path="/:organizationId/:dogId">
                    <DogDetail />
                </Route>
                <Route path="/">
                    <DogList />
                </Route>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
