// const RequisitionAccordion

import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import Table from './common/table';

export class RequisitionAccordion extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path);
    };

    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    };

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
                    <tr key={item._id}>
                        <Accordion key={item._id}>
                            <Card key={item._id}>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {/* <tr > */}
                                    {columns.map((column) => (
                                        <td
                                            key={this.createKey(item, column)}
                                            style={{
                                                diplay: 'inline-block',
                                                width: '200px'
                                            }}
                                        >
                                            {this.renderCell(item, column)}
                                        </td>
                                    ))}
                                    {/* </tr> */}
                                </Accordion.Toggle>

                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Table
                                            columns={itemColumns}
                                            data={item.items}
                                            sortColumn={sortColumn}
                                            onSort={onSort}
                                            addClass={"table table-sm table-warning "}
                                        />
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
