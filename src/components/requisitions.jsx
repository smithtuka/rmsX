import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RequisitionsTable from './requisitionsTable';
import { getRequisitions, deleteRequisition } from '../services/reqService';

class Requisitions extends Component {
    state = {
        requisitions: [],
        stages: []
    };

    pullRequisitions = async function () {
        const url = process.env.REACT_APP_PUBLIC_URL; // see how to use
        return axios.get('http://rms-a.herokuapp.com/v1/requisitions');
    };

    async componentDidMount() {
        const requisitions = [...(await this.pullRequisitions()).data];
        console.log(requisitions);
        requisitions && this.setState({ requisitions });
        // this.setState({ requisitions: getRequisitions() });
    }

    handleDelete = (requisition) => {
        const requisitions = this.state.requisitions.filter(
            (r) => r.id !== requisition.id
        );
        this.setState({ requisitions });
        deleteRequisition(requisition.id);
    };

    handleReject = (requisition) => {
        // const requisitions = [...this.state.requisitions];
        // const index = requisitions.indexOf(requisition);
        // this.setState({ requisitions });
    };

    handleApprove = (requisition) => {
        const requisitions = [...this.state.requisitions];
        // const index = requisitions.indexOf(requisition);
        // requisitions[index] = { ...requisitions[index] };
        // requisitions[index].liked = !requisitions[index].liked;
        this.setState({ requisitions });
    };

    render() {
        return (
            <div className="row">
                <div className="col-1"></div>
                <div className="col">
                    <Link
                        to="/requisitions/new"
                        className="btn btn-primary"
                        style={{ marginBottom: 15 }}
                    >
                        New Requisition
                    </Link>
                    <p>
                        Showing {this.state.requisitions.length} requisitions.
                    </p>
                    {/* <SearchBox value={searchQuery} onChange={this.handleSearch} /> */}
                    <RequisitionsTable
                        requisitions={this.state.requisitions}
                        //   sortColumn={sortColumn}
                        onApprove={this.handleApprove}
                        onReject={this.handleReject}
                        onDelete={this.handleDelete}
                        //   onSort={this.handleSort}
                    />
                    {/* <Pagination
          onPageChange={this.handlePageChange}
        /> */}
                </div>
            </div>
        );
    }
}

export default Requisitions;
