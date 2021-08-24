import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Totals from './Totals';
import Season from './Season';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/totals">
            <Totals />
          </Route>
          <Route exact path="/seasons">
            <Season />
          </Route>

          <Route path="*">
            <div>404 Page not found.</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
