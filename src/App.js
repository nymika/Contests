import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {

  state = {
    contests: [],
    search: '',
    filter: 'all'
  }

  searchSpace = (event) => {
    this.setState({ 
      search: event.target.value 
    })
  }

  filterData = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  GetListOfContests() {
    axios.get('https://codeforces.com/api/contest.list')
      .then(response => {
        this.setState({
          contests: response.data.result,
        })
      }).catch((e) => alert(e))
  }

  componentDidMount() {
    this.GetListOfContests()
  }

  render() {

    let ICPCList = this.state.contests.filter(i => {
      return i.type === "ICPC";
    }).map(i => {
      return (
        <p key={i.id}>{i.name} - {i.type}</p>
      )
    })

    let CFList = this.state.contests.filter(i => {
      return i.type === "CF";
    }).map(i => {
      return (
        <p key={i.id}>{i.name} - {i.type}</p>
      )
    })

    let SearchList = this.state.contests.filter(data => {
      return data.name.toLowerCase().includes(this.state.search.toLowerCase())
    }).map(i => {
      return (
        <p key={i.id}>{i.name} - {i.type}</p>
      )
    })

    const AllContestsList = this.state.contests.map(i => {
      return (
        <div>
          <p key={i.id}>{i.name} - {i.type}</p>
        </div>
      )
    })

    const displayContests = () => {
      if (this.state.search !== '')
        return SearchList
      if (this.state.filter === 'icpc')
        return ICPCList
      else if (this.state.filter === 'cf')
        return CFList
      else
        return AllContestsList
    }

    return (
      <div className="App">
        <header className="App-header">

          <select value={this.state.filter} onChange={(e) => this.filterData(e)}>
            <option value="icpc">ICPC</option>
            <option value="cf">CF</option>
            <option value="all">All</option>
          </select>

          <input type="text" placeholder="Enter item to be searched" onChange={(e) => this.searchSpace(e)} />

          {displayContests()}
        </header>
      </div>
    );
  }
}

export default App;
