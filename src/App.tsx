import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CountryStats } from './components/CountryStats';
import { GlobalStats } from './components/GlobalStats';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Covid Tracker</h1>
          <Switch>
            <Route path="/countrystats">
              <CountryStats />
            </Route>
            <Route path="/">
              <GlobalStats />
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
