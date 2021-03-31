import { Route, Switch } from 'react-router-dom';

import { DogList } from "./components/DogList/DogList";
import { DogDetail } from "./components/DogDetail/DogDetail";

import "./assets/scss/main.scss";

function App() {

  return (
    <div className="wrapper">
        <h1><a href="/">DogFinder <span className="city">Chicago</span></a></h1>
        <Switch>
            <Route path='/' component={DogList} />
            <Route path='/dog' component={DogDetail} />
        </Switch>
    </div>
  );
}

export default App;
