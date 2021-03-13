import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import HomePage from './Homepage'
import ContestDetailPage from './ContestDetailPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Route path="/" exact component={HomePage} />
        <Route path="/contest/:id" component={ContestDetailPage}/>

      </BrowserRouter>
    );
  }
}

export default App;