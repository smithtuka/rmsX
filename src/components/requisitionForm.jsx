import React from 'react';
import Joi from 'joi-browser';
import axios from 'axios';
import RequisitionTable from './requisitionTable';
import Form from './common/form';
import { DateUtil } from '../utils/dateUtil';
import Select from './common/select';
import WebServiceUtils from '../utils/webServiceUtils';
import _ from 'lodash';
import { findProjectDto, getProjectModel } from '../services/reqService';

class RequisitionForm extends Form {
    state = {
        data: {},
        errors: {},
        projects: [],
        //[],
        stages: [
            { id: '1', name: 'FOUNDATION' },
            { id: '2', name: 'SUBSTRUCTURE' },
            { id: '3', name: 'ROOFING' },
            { id: '4', name: 'FINISHES' }
        ],
        items: [],
        amount: '0'
    };

    schema = {
        project: Joi.string().required().label('Project'),
        stage: Joi.string().required().label('Stage'),
        requester: Joi.string().required().label('Requester'),
        amount: Joi.number()
            .required()
            .min(0)
            .max(10000000)
            .label('Total Amount'),
        approvalStatus: Joi.string().label('Status')
    };

    // handleChange = ({ currentTarget: input }) => {
    //     // const errors = { ...this.state.errors };
    //     // const errorMessage = this.validateProperty(input);
    //     // if (errorMessage) errors[input.name] = errorMessage;
    //     // else delete errors[input.name];

    //     const data = { ...this.state.data };
    //     const errors = { ...this.state.errors };
    //     data[input.name] = input.value;
    //     alert.log('DATA IS: ', data, 'data: ');
    //     this.setState({ data, errors });
    // };

    pullItems = async (id) => {
        // even project and stage if need be
        const url = `https://rms-a.herokuapp.com/v1/requisitions/${id}`;
        const result = await axios.get(url);
        console.log('AXIOS - FETCHED REQUISITIONS: ', result.data);
        return result;
    };

    async componentDidMount() {
        //axios calls here
        let projects = await (
            await axios.get('https://rms-a.herokuapp.com/v1/projects/dto')
        ).data;
        this.setState({ projects });

        const requisitionId = this.props.match.params.id;
        if (requisitionId === 'new') return;

        let requisition = await (await this.pullItems(requisitionId)).data;
        const items = [...requisition.items];
        console.log('items for project ', requisitionId, ' are : ', items);
        // populate form to enable editting here!

        this.setState({ id: requisitionId, items, projects });
        console.log(JSON.stringify(requisition));
        // console.log(requisition);
        if (!requisition) return this.props.history.replace('/not-found');
    }

    initilaizeRequest = () => {
        // fix this later -- cd push emty item in 0 position
        const items = [...this.state.items];
        const amount = _.sum(this.state.items.map((i) => i.quantity * i.price));
        console.log('Amount: ', amount, 'items: ', items);

        const data = { ...this.state.data };

        const stage = data.stage === '' ? this.state.stages[0].id : data.stage;

        const project =
            data.project === '' ? this.state.projects[0].id : data.project;

        data.stage = stage;
        data.project = project;

        this.setState({ amount, data });
    };

    doSubmit = () => {
        // saveRequisition(this.state.data);
        // even project and stage if need be
        const url = `https://rms-a.herokuapp.com/v1/requisitions`;
        const data = this.state.data;
        alert('doSubmit', data.stage);
        const result = 0; //= await axios.post(url,         );
        console.log(result.data);
        return result;
        // this.props.history.push('/requisitions');
    };

    handleSubmit = async () => {
        // e.preventDefault();
        const data = { ...this.state.data };
        const stage =
            data.stage === undefined ? this.state.stages[0].id : data.stage;
        const project =
            data.project === undefined
                ? this.state.projects[0].id
                : data.project;

        data.stage = stage;
        data.project = project;

        const items = [...this.state.items];
        const amount = _.sum(this.state.items.map((i) => i.quantity * i.price));
        console.log('Amount: ', amount, 'items: ', items);

        this.setState({ data });

        if (
            amount <= 0 ||
            isNaN(amount) ||
            this.state.data.project == undefined ||
            this.state.data.stage == undefined
        ) {
            alert('Ooops, please check, verify and submit again!');
            return;
        }

        console.log(
            'requesting UGX: ',
            this.state.amount,
            'for stage: ',
            this.state.data.stage,
            'and project: ',
            this.state.data.project
        );

        const postData = {
            requiredDate: '2021-02-24T02:42:44.649+00:00',
            requester: JSON.parse(sessionStorage.getItem('user')),
            stage: JSON.parse(this.state.data.stage),
            items: items,
            approvalStatus: 'RECEIVED'
        };

        const headers = {
            'Content-Type': 'application/json'
            // Authorization: 'JWT fefege...'
        };

        await axios
            .post('https://rms-a.herokuapp.com/v1/requisitions', postData)
            // .post('http://localhost:8080/v1/requisitions', postData)
            .then(
                (response) => {
                    console.log(response);
                    alert('Successfully submitted!! ', response.status);
                },
                (error) => {
                    console.log(error);
                    // window.location.reload();
                    alert('sorry, you may please submit again! ', error);
                }
            );
    };

    changeAmount = (amount) => {
        this.setState({ amount });
    };

    changeItems = (items) => {
        this.setState({ items });
    };

    handleDateSelect = (date) => {
        console.log(date);
        const data = { ...this.state.data };
        data['date'] = date;
        this.setState({ data });
        console.log(data);
    };

    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data };
        const errors = { ...this.state.errors };
        data[input.name] = input.value;
        console.log('DATA IS for: ', data[input.name], data.project);
        if (input.name === 'project') {
            const stages = [...this.state.projects[input.value - 1].stages];
            console.log('stages :: ' + JSON.stringify(stages));
            this.setState({ stages });
        }
        this.setState({ data, errors });
        // console.log('project Data: ', this.state.data.project);
    };

    renderSelect(name, label, options) {
        const { data, errors } = this.state;
        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    renderDate(name) {
        const { data, errors } = this.state;
        return (
            <DateUtil
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
                selected={new Date()}
                onDateChange={this.handleDateSelect}
            />
        );
    }

    renderButton(label, classNames) {
        return (
            <button
                className={
                    null == classNames ? ' btn btn-danger m-3' : classNames
                }
                onClick={this.handleSubmit}
            >
                {label}
            </button>
        );
    }

    render() {
        const { id, items, stages, projects, data } = this.state;
        return (
            <div>
                <h2>
                    Requisition Form
                    <span className="badge rounded-pill bg-warning m-3">
                        UGX {this.state.amount.toLocaleString('en-us')}
                    </span>
                    {this.renderButton('Submit Request')}
                </h2>
                <div className="container px-4">
                    <div className="row gx-5">
                        <div className="col">
                            <div className="p-2 border bg-light">
                                {this.renderSelect(
                                    'project',
                                    'Project',
                                    projects
                                )}
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-2 border bg-light">
                                {this.renderSelect('stage', 'Stage', stages)}
                            </div>
                        </div>
                        <div className="col">
                            <div className="p-2 border bg-light form-group">
                                <div>{'Date Required'}</div>
                                {this.renderDate('date')}
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <RequisitionTable
                    onChangeAmount={this.changeAmount}
                    requisitionItems={items}
                    onChangeitems={this.changeItems}
                    project={projects}
                    stage={stages}
                    id={id}
                />
                <h6>Amount: {_.sum(items.map((i) => i.quantity * i.price))}</h6>
                <h6>
                    Project:
                    {/* {this.state.data.project === undefined
                        ? this.state.projects[0].id
                        : this.state.data.project} */}
                </h6>
                <h6>
                    Stage:
                    {/* {this.state.data.stage === undefined
                        ? this.state.stages[0].id
                        : this.state.data.stage} */}
                </h6>
                <h6>
                    Date:
                    {this.state.data.date === undefined
                        ? new Date().toDateString()
                        : this.state.data.date.toDateString()}
                </h6>
            </div>
        );
    }
}

export default RequisitionForm;
