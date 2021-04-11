import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReqTable from './reqTable';

class RequisitionsTable extends Component {
    // id, project, stage, amount, date, requester, Status, Actions[Edit, Approve, Reject, Delete]

    idPadding = (value, padding) => {
        const zeroes = new Array(padding + 1).join('0');
        return (zeroes + value).slice(-padding);
    };
    computeAmount = (requisition) => {
        const items = [...requisition.items];
        let sum = 0;
        for (const i of items) {
            sum += i.price * i.quantity;
        }
        return sum.toLocaleString('en-us');
        // _.items.map(i => i.price*i.quantity).sum();
        // _.sumBy(userSelectedColors, _.partial(_.sumBy, items));
    };
    columns = [
        {
            path: 'id',
            label: 'Id',
            content: (requisition) => (
                <Link to={`/requisitions/${requisition.id}`}>{`R${
                    requisition.id < 1000
                        ? this.idPadding(requisition.id, 3)
                        : requisition.id
                }`}</Link>
            )
        },
        {
            path: 'requisition.project',
            label: 'Project',
            content: (requisition) =>
                `${
                    null !== requisition.stage &&
                    null !== requisition.stage.project
                        ? requisition.stage.project.name
                        : 'TBD'
                }`
        },
        {
            path: 'requisition.date',
            label: 'Date',
            content: (requisition) =>
                `${
                    null != requisition.requiredDate
                        ? requisition.requiredDate.split('T')[0]
                        : null
                }`
        },
        {
            path: 'requester',
            label: 'Requester',
            content: (requisition) => `${requisition.requester.firstName}`
        },
        {
            path: 'requisition.stage.name',
            label: 'Stage',
            content: (requisition) =>
                `${null !== requisition.stage ? requisition.stage.name : 'TBD'}`
        },
        {
            path: 'amount',
            label: 'Amount',
            content: (requisition) => (
                <span>{this.computeAmount(requisition)}</span>
            )
        },
        {
            path: 'requisition.status',
            label: 'Status',
            content: (requisition) => `${requisition.approvalStatus}`
        },
        {
            key: 'approve',
            content: (requisition) => (
                <button
                    onClick={() => this.props.onApprove(requisition)}
                    className= { requisition.approvalStatus =='AUTHORIZED'? "btn btn-success btn-sm": "btn btn-warning btn-sm"}
                    style={{visibility: requisition.approvalStatus !='APPROVED' &&
                    requisition.approvalStatus !='REJECTED'?  'visible' : 'hidden' }}
                >
                    
                    { requisition.approvalStatus =='AUTHORIZED'? "Approve": "Authorize"}
                </button>
            )
        },
        {
            key: 'reject',
            content: (requisition) => (
                <button
                    onClick={() => this.props.onReject(requisition)}
                    // requisition.approvalStatus ==="AUTHORIZED"? "danger":"warning"
                    className={
                        'btn btn-sm btn-danger'
                    }
                    style={{visibility: requisition.approvalStatus !='APPROVED' &&
                    requisition.approvalStatus !='REJECTED'?  'visible' : 'hidden' }}
                >
                    Reject
                </button>
            )
        }
    ];

    render() {
        const { requisitions, onSort, sortColumn } = this.props;

        return (
            <React.Fragment>
            <ReqTable
                columns={this.columns}
                data={requisitions}
                sortColumn={sortColumn}
                onSort={onSort}
            />

            </React.Fragment>
        );
    }
}

export default RequisitionsTable;
