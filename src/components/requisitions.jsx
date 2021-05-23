import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RequisitionsTable from './requisitionsTable';
import { getRequisitions, deleteRequisition } from '../services/reqService';
import ListGroup from './common/listGroup';

class Requisitions extends Component {
    state = {
        requisitions: [],
        selectedRequisitions: [],
        stages: [],
        status: [{id:1, name:'RECEIVED'}, {id:2, name:'APPROVED'},{id:3, name:'AUTHORIZED'}, {id:4, name:'REJECTED'}],
        selectedStatus : {id:1, name:'RECEIVED'}
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
                sessionStorage.clear();
                // alert('Server error, please contact Admin');
                window.location.reload();
                console.log(err);
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
                // `https://localhost:8080/v1/requisitions/${requisition.id}?approvalStatus=REJECTED`
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
                // `https://localhost:8080/v1/requisitions/${requisition.id}?approvalStatus=APPROVED`
            ).then(response => alert('Requisition approval ' + ' :: ' + response.data))
                .catch(error => console.log(error));
            window.location.reload();
            // alert('Requisition approval ' + ' :: ' + response.data);
        } else alert('You are not authorized to Approve Requisitions');
    };

    isAdmin = () => {
        return JSON.parse(sessionStorage.getItem('user')).role === 'ADMIN';
    };

    handleStatusSelect = status => {
        const selectedRequisitions = _.filter([...this.state.requisitions], ['approvalStatus',(status.name)]);
        // alert(JSON.stringify(selectedRequisitions));
        this.setState({ selectedStatus: status, selectedRequisitions}); //, searchQuery: "", currentPage: 1 });
    };

    render() {
        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.status}
                        selectedItem={this.state.selectedStatus}
                        onItemSelect={this.handleStatusSelect}
                    />
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
                        Showing {this.state.selectedRequisitions.length} requisitions.
                    </p>
                    {/* <SearchBox value={searchQuery} onChange={this.handleSearch} /> */}
                    <RequisitionsTable
                        requisitions={this.state.selectedRequisitions}
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
