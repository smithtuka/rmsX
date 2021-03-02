import React, { Component } from 'react';
import { Link } from "react-router-dom";
import RequisitionsTable from "./requisitionsTable";
// import ListGroup from "./common/listGroup";
// import Pagination from "./common/pagination";
import {getRequisitions, deleteRequisition} from "../services/reqService";
// import _ from "lodash";

class Requisitions extends Component {
    state = { 
        requisitions: [],
        stages:[]
     }

     componentDidMount() {
        this.setState({ requisitions: getRequisitions() });
      }
    
      handleDelete = (requisition) => {
        const requisitions = this.state.requisitions.filter(r => r.id !== (requisition).id);
        this.setState({ requisitions });
        deleteRequisition(requisition.id);
      };

      handleReject = (requisition) => {
        // const requisitions = [...this.state.requisitions];
        // const index = requisitions.indexOf(requisition);
        // this.setState({ requisitions });
      };
    
      handleApprove = requisition => {
        const requisitions = [...this.state.requisitions];
        // const index = requisitions.indexOf(requisition);
        // requisitions[index] = { ...requisitions[index] };
        // requisitions[index].liked = !requisitions[index].liked;
        this.setState({ requisitions });
      };

    render() { 
        return ( 

      <div className="row">
      <div className="col-1">
      </div>
      <div className="col">
        <Link
          to="/requisitions/new"
          className="btn btn-primary"
          style={{ marginBottom: 15 }}
        >
          New Requisition
        </Link>
        <p>Showing {this.state.requisitions.length} requisitions in the database.</p>
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