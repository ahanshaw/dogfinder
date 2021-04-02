import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import { Header } from "./components/Header/Header";
import { DogList } from "./components/DogList/DogList";
import { DogDetail } from "./components/DogDetail/DogDetail";

import "./assets/scss/main.scss";

function App() {

  return (
    <div className="wrapper">
        <Header />
        <Router>
            <Switch>
                <Route path="/:organizationId/:dogId">
                    <DogDetail />
                </Route>
                <Route path="/:pageNum">
                    <DogList />
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
