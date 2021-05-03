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
        // return axios.get('https://rms-a.herokuapp.com/v1/requisitions');
        return axios.get('http://localhost:8080/v1/requisitions');
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

    handleReject = async (requisition) => {
        alert(`Are you sure you want to reject Req:: R00${requisition.id}`);
        const response = await axios.put(
            `https://rms-a.herokuapp.com/v1/requisitions/${requisition.id}?approvalStatus=REJECTED`
        );
        window.location.reload(); // hack?
        alert('Requisition rejection ' + ' :: ' + response.data);
    };

    handleApprove = async (requisition) => {
        const response = await axios.put(
            `https://rms-a.herokuapp.com/v1/requisitions/${requisition.id}?approvalStatus=APPROVED`
        );
        window.location.reload();
        alert('Requisition approval ' + ' :: ' + response.data);
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
                        Make New Requisition
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
