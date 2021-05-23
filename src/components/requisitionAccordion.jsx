// const RequisitionAccordion

import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import Table from './common/table';
import axios from 'axios';

export class RequisitionAccordion extends Component {

    state = {
        metadata : {projectName: "", stageName: "", stageBudget: 0, stageProvisionalSum: 0}

    }
    renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path);
    };

    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    };

    fetchRequisitionMetaData = async (id) => {
        console.log(" :: {}", id);
         await axios
            .get(`https://rms-a.herokuapp.com/v1/requisitions/metadata/${id}`)
            // .get(`http://localhost:8080/v1/requisitions/metadata/${id}`)
            .then((res) => {
                let metadata = {...res.data}
                this.setState({metadata})
                console.log("METADATA  :: " + JSON.stringify(this.state.metadata))
                return res.data;
            })
            .catch((err) => {
                console.log(err);
                alert('Server error, please contact Admin :: ' + id);
                window.location.reload();
            });
    }
    
    reloadPage = () =>{
        window.location.reload();
    }

    render() {
        const { data, columns, onSort, sortColumn } = this.props;
        const itemColumns = [
            {
                path: 'item.id',
                label: '#',
                content: (item) => item.id
            },
            {
                path: 'item.description',
                label: 'Item',
                content: (item) => `${item.description}`
            },

            {
                path: 'item.quantity',
                label: 'Qty',
                content: (item) => `${item.quantity}`
            },
            ,
            {
                path: 'item.price',
                label: 'price',
                content: (item) => `${item.price}`
            },
            {
                path: 'amount',
                label: 'Amount',
                content: (item) => <span>{item.quantity * item.price}</span>
            }
        ];

        return (
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <Accordion key={item.id} >
                            <Card key={item.id}>
                                <Accordion.Toggle as={Card.Header} eventKey={item.id} activeKey={item.id} className="panel-toggle" variant="link">
                                    {columns.map((column) => (
                                        <td
                                            key={this.createKey(item, column)}
                                            style={{
                                                width: '200px'
                                            }}
                                        >
                                            {this.renderCell(item, column)}
                                        </td>
                                    ))}
                                </Accordion.Toggle>

                                <Accordion.Collapse as={Card.Header} eventKey={item.id} onmouseout ={()=> window.location.reload()} onEntering={() => this.fetchRequisitionMetaData(item.id)  }>
                                    <Card.Body>
                                        <Table
                                            columns={itemColumns}
                                            data={item.items}
                                            sortColumn={sortColumn}
                                            onSort={onSort}
                                            addClass={"table table-sm table-warning "}
                                        />
                                        <tr>
                                            <td>Project: </td><td className="badge rounded-pill bg-info m-2">{this.state.metadata.projectName}</td>
                                            <td>Stage: </td><td className="badge rounded-pill bg-info m-2">{this.state.metadata.stageName}</td>
                                            <td>Budget: </td><td className="badge rounded-pill bg-info m-2">{"UGX "+ this.state.metadata.stageBudget.toLocaleString('en-us')}</td>
                                            <td>Remaining Bal: </td><td className="badge rounded-pill bg-info m-2">{"UGX "+ Number(this.state.metadata.stageBudget - this.state.metadata.stageProvisionalSum).toLocaleString('en-us')}</td>

                                        </tr>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default RequisitionAccordion;
