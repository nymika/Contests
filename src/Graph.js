import React, { Component } from 'react';
import axios from 'axios';
import CanvasJSReact from './assets/canvasjs.react'
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            contests: [],
            data: []
        }
    }

    GetListOfContests() {
        axios.get('https://codeforces.com/api/contest.list')
            .then(response => {
                this.setState({
                    contests: response.data.result,
                    data: [
                        {x: this.state.contests[0].id, y: this.state.contests[0].id},
                        { x: 10, y: 71 },
                        { x: 20, y: 55 },
                        { x: 30, y: 50 },
                    ]
                })
            }).catch((e) => alert(e))
    }

    componentDidMount() {
        this.GetListOfContests()
    }

    render() {
        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            title: {
                text: this.state.title
            },
            axisY: {
                includeZero: true
            },
            data: [{
                type: "column", //change type to column, bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: this.state.data
                // dataPoints: [
                //     { x: 10, y: 71 },
                //     { x: 20, y: 55 },
                //     { x: 30, y: 50 },
                //     { x: 40, y: 65 },
                //     { x: 50, y: 71 },
                //     { x: 60, y: 68 },
                //     { x: 70, y: 38 },
                //     { x: 80, y: 92, indexLabel: "Highest" },
                //     { x: 90, y: 54 },
                //     { x: 100, y: 60 },
                //     { x: 110, y: 21 },
                //     { x: 120, y: 49 },
                //     { x: 130, y: 36 }
                // ]
            }]
        }
        console.log(this.state.contests)
        return (
            <div>
                <CanvasJSChart options={options}
                // onRef={ref => this.chart = ref}
                />
            </div>
        );
    }
}

export default Graph;  