import React from 'react';
import _ from 'lodash';
// import Joi from "joi-browser";
// import { render } from '@testing-library/react';

export default class RequisitionTable extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.requisitionItems);
        this.state = {
            item: {
                description: '',
                quantity: '0',
                price: '0'
            },
            items: [...this.props.requisitionItems]
        };
    }
    updateItem({ currentTarget: input }) {
        let item = { ...this.state.item };
        item[input.name] = input.value;
        this.setState({ item });
    }

    updateAmount(items) {
        const amount = _.sum(items.map((i) => i.quantity * i.price));
        this.props.onChangeAmount(amount);
        this.props.onChangeitems(items);
    }

    componentDidMount() {
        const items = [...this.props.requisitionItems];
        console.log('ITEM', items);
        this.setState({ items });
        this.updateAmount(items);
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.requisitionItems !== this.state.requisitionItems) {
        //     const items = [...this.props.requisitionItems];
        //     console.log('id::', this.props.id);
        //     const amount = _.sum(items.map((i) => i.quantity * i.price));
        //     console.log('AMOUNT', amount);
        //     // this.setState({ items, amount });
        //     this.updateAmount(amount);
        // }
    }

    handleClick() {
        let items = [...this.state.items];
        items.push(this.state.item);
        this.updateAmount(items);
        this.setState({
            items,
            item: {
                description: '',
                quantity: '0',
                price: '0'
            }
        });
    }

    handleItemChanged(i, { target: field }) {
        let items = [...this.state.items];
        items[i][field.name] = field.value;
        this.updateAmount(items);
        this.setState({
            items: items
        });
    }

    handleItemDeleted(i) {
        let items = [...this.state.items];
        items.splice(i, 1);
        this.updateAmount(items);
        this.setState({ items });
    }

    renderRows() {
        let context = this;
        return this.state.items.map(function (o, i) {
            return (
                <tr key={'item-' + i}>
                    <td>
                        <input
                            type="text"
                            name="description"
                            value={o.description}
                            onChange={context.handleItemChanged.bind(
                                context,
                                i
                            )}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="quantity"
                            value={o.quantity}
                            onChange={context.handleItemChanged.bind(
                                context,
                                i
                            )}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="price"
                            value={o.price}
                            onChange={context.handleItemChanged.bind(
                                context,
                                i
                            )}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="amount"
                            disabled
                            value={o.quantity * o.price}
                            onChange={context.handleItemChanged.bind(
                                context,
                                i
                            )}
                        />
                    </td>
                    <td>
                        <button
                            onClick={context.handleItemDeleted.bind(context, i)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        // const {onChangeAmount} = this.props;
        return (
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount (UGX)</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                </table>
                <hr />
                <span className="m-3">
                    <label htmlFor="description">item :</label>
                    <input
                        type="text"
                        name="description"
                        value={this.state.item.description}
                        onChange={this.updateItem.bind(this)}
                    />
                </span>

                <span className="m-4">
                    <label htmlFor="qty">qty :</label>
                    <input
                        type="text"
                        name="quantity"
                        value={this.state.item.quantity}
                        onChange={this.updateItem.bind(this)}
                    />
                </span>
                <span className="m-4">
                    <label htmlFor="price">price :</label>
                    <input
                        type="text"
                        name="price"
                        value={this.state.item.price}
                        onChange={this.updateItem.bind(this)}
                    />
                </span>
                <button onClick={this.handleClick.bind(this)}>Add Item</button>
            </div>
        );
    }
}
