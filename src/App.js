import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import HomePage from './Homepage'
import ContestDetailPage from './ContestDetailPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <div className="headerbox">
          <h1>LIST OF CONTESTS</h1>
        </div>
        <hr />

        <Route path="/" exact component={HomePage} />
        <Route path="/contest/:id" component={ContestDetailPage} />

        <div className="footerbox">
          <hr />
          <p>Created by Nymika Pasnoori</p>
        </div>

      </BrowserRouter>
    );
  }
}

export default App;