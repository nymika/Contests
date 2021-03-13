import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './App.css';
import ReactPaginate from 'react-paginate';

class PaginationApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            data: this.props.data,
            perPage: this.props.perPage,
            currentPage: 0,
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    receivedData() {
        const data = this.state.data;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map(i => {
            return (
                <Link to={
                    {
                        pathname: `contest/${i.id}`,
                        state: data,
                    }}
                    key={i.id} 
                    style={{ textDecoration: 'none' }}>
                    <div className="contestRow">
                        <p className="contestName">{i.name}</p>
                        <p className="contestType">Type - {i.type}</p>
                    </div>
                </Link>
            )
        })

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),

            postData: postData,
        })

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
            //console.log(this.state)
        });

    };

    changePageSize = (event) => {
        this.setState({
            perPage: event.target.value
        }, () => {
            this.receivedData()
        });
    };

    componentDidMount() {
        this.receivedData()
    }

    componentDidUpdate(prevprops) {
        if (this.props.data !== prevprops.data) {
            this.setState({
                data: this.props.data
            }, () => this.receivedData())
        }

        if (this.props.perPage !== prevprops.perPage) {
            this.setState({
                perPage: this.props.perPage
            }, () => this.receivedData())
        }
    }


    render() {

        return (

            <div>
                {/* <input className="pagesizebox" type="number" min="1" value={this.state.perPage} onChange={(e) => this.changePageSize(e)}></input> */}

                {this.state.postData}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>

        );
    }

}
export default PaginationApp;