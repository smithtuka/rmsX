import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RequisitionsTable from './requisitionsTable';
import { getRequisitions, deleteRequisition } from '../services/reqService';

class Requisitions extends Component {
    state = {
        requisitions: [],
        selectedRequisitions: [],
        stages: []
    };

    async componentDidMount() {
        let requisitions = [];

        await axios
            .get('https://rms-a.herokuapp.com/v1/requisitions/all')
            // .get('http://localhost:8080/v1/requisitions/all')
            .then((res) => {
                requisitions = [...res.data];
                console.log(res.data.length);
                requisitions && this.setState({ requisitions });
            })
            .catch((err) => {
                console.log(err);
                alert('Server error, please contact Admin');
            });
    }

    handleDelete = (requisition) => {
        const requisitions = this.state.requisitions.filter(
            (r) => r.id !== requisition.id
        );
        this.setState({ requisitions });
        deleteRequisition(requisition.id);
    };

    handleReject = async (requisition) => {
        console.log(` rejecting :: R00${requisition.id}`);
        if (JSON.parse(sessionStorage.getItem('user')).role === 'ADMIN') {
            const response = await axios.put(
                `https://rms-a.herokuapp.com/v1/requisitions/${requisition.id}?approvalStatus=REJECTED`
            );
            window.location.reload();
            alert('Requisition rejection ' + ' :: ' + response.data);
        } else alert('You are not authorized to Approve Requisitions');
    };

    handleApprove = async (requisition) => {
        console.log(` approving :: R00${requisition.id}`);
        if (JSON.parse(sessionStorage.getItem('user')).role === 'ADMIN') {
            const response = await axios.put(
                `https://rms-a.herokuapp.com/v1/requisitions/${requisition.id}?approvalStatus=APPROVED`
            );
            window.location.reload();
            alert('Requisition approval ' + ' :: ' + response.data);
        } else alert('You are not authorized to Approve Requisitions');
    };

    isAdmin = () => {
        return JSON.parse(sessionStorage.getItem('user')).role === 'ADMIN';
    };

    render() {
        return (
            <div className="row">
                <div className="col-2">
                    <ul className="list-group">
                        <li
                            className="list-group-item active"
                            aria-current="true"
                        >
                            All
                        </li>
                        <li className="list-group-item">Approved</li>
                        <li className="list-group-item">Rejected</li>
                        <li className="list-group-item">Authorized</li>
                        <li className="list-group-item">New</li>
                    </ul>
                </div>
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
