import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import PaginationApp from './Pagination'
import CanvasJSReact from './assets/canvasjs.react'
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class HomePage extends Component {

  state = {
    contests: [],
    search: '',
    filter: 'all',
    filterGraph: 'all'
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

  filterGraph = (event) => {
    this.setState({
      filterGraph: event.target.value
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
    })

    let CFList = this.state.contests.filter(i => {
      return i.type === "CF";
    })

    let SearchList = this.state.contests.filter(data => {
      return data.name.toLowerCase().includes(this.state.search.toLowerCase())
    })

    let displayContests = () => {
      if (this.state.search !== '')
        return SearchList
      if (this.state.filter === 'icpc')
        return ICPCList
      else if (this.state.filter === 'cf')
        return CFList
      else
        return this.state.contests
    }

    var graph = (
      <h1>loading..</h1>
    )

    if (this.state.contests.length !== 0) {
      let options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title: {
          text: 'Duration vs Contest id'
        },
        axisY: {
          includeZero: true
        },
        data: [{
          type: "line", //change type to column, bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: this.state.contests.map(i => ({ label: i.name, y: i.durationSeconds }))
        }]
      }

      //console.log(options.data[0].dataPoints)
      if (this.state.filterGraph === 'icpc') {
        options.data[0].dataPoints = this.state.contests.filter(i => {
          return i.type === "ICPC";
        }).map(i => ({ label: i.name, y: i.durationSeconds }))

        options.title.text += '- ICPC contests only'
      }

      if (this.state.filterGraph === 'cf') {
        options.data[0].dataPoints = this.state.contests.filter(i => {
          return i.type === "CF";
        }).map(i => ({ label: i.name, y: i.durationSeconds }))

        options.title.text += '- CF contests only'
      }

      if (this.state.filterGraph === 'notcompletedcontests') {
        options.data[0].dataPoints = this.state.contests.filter(i => {
          return i.phase === "BEFORE";
        }).map(i => ({ label: i.name, y: i.durationSeconds }))

        options.title.text += '- Unfinished contests only'
      }

      if (this.state.filterGraph === 'completedcontests') {
        options.data[0].dataPoints = this.state.contests.filter(i => {
          return i.phase === "FINISHED";
        }).map(i => ({ label: i.name, y: i.durationSeconds }))

        options.title.text += '- Finished contests only'
      }

      graph = (
        <CanvasJSChart options={options} />
      )
    }

    return (
      <div className="App">

        <div className="row">

          <div className="column">

            <select value={this.state.filter} onChange={(e) => this.filterData(e)}>
              <option value="icpc">ICPC</option>
              <option value="cf">CF</option>
              <option value="all">All</option>
            </select>

            <input type="text" placeholder="Enter item to be searched" onChange={(e) => this.searchSpace(e)} />

            {
              (displayContests().length !== 0) ?
                <PaginationApp data={displayContests()} />
                : null
            }
          </div>


          <div className="column">

            <select value={this.state.filterGraph} onChange={(e) => this.filterGraph(e)}>
              <option value="icpc">ICPC</option>
              <option value="cf">CF</option>
              <option value="notcompletedcontests">Not completed</option>
              <option value="completedcontests">completed</option>
              <option value="all">All</option>
            </select>

            {graph}

          </div>

        </div>
      </div>
    );
  }
}

export default HomePage;