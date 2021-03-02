import React from "react";
import Joi from "joi-browser";
import RequisitionTable from "./requisitionTable"
import Form from "./common/form";
import {DateUtil} from '../utils/dateUtil'
// import Select from './common/select';
// import _ from 'lodash'
import {getRequisition, getProjectModel } from "../services/reqService";


class RequisitionForm extends Form {
  state = {
    data: {
      projectId: "",
      stageId:"",
      requester: "",
      amount: "",
      approvalStatus:[]
    },
    projects : [], //[{"id":"1", "name":"KIIRA"}, {"id":"2", "name":"ROBUST"}, {"id":"3", "name":"ROBUST"}, {"id":"4", "name":"ROBUST"}],
    stages: [{"id":"1", "name":"FOUNDATION"}, {"id":"2", "name":"SUBSTRUCTURE"},{"id":"3", "name":"ROOFING"}, {"id":"4", "name":"FINISHES"}],
    items:[],
    errors: {},
    amount: "0"
  };

  schema = {
    project: Joi.string()
    .required()
    .label("Project"),
    stage: Joi.string()
      .required()
      .label("Stage"),
    requester: Joi.string()
      .required()
      .label("Requester"),
    amount: Joi.number()
      .required()
      .min(0)
      .max(10000000)
      .label("Total Amount"),
    approvalStatus: Joi.string()
      .label("Status")
  };

  componentDidMount() {
    //axios calls here
    const projects = [...getProjectModel()]
    const stages = [...this.state.stages]
    this.setState({projects, stages });

    const requisitionId = this.props.match.params.id;
    if (requisitionId === "new") return;

    const requisition = getRequisition(this.props.match.params.id);
    if (!requisition) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(requisition) });
  }

  mapToViewModel(requisition) {
    return {
        // fix (s) 
        projectId: requisition.stage.project.name,
        stageId: requisition.stage.name,
        requester: requisition.requester.firstName,
        amount: `{(requisition) => this.calculateAmount(requisition)}`,
        approvalStatus:requisition.approvalStatus,
        items : requisition.items
    };
  }

  doSubmit = () => {
    // saveRequisition(this.state.data);
    this.props.history.push("/requisitions");
  };

  changeAmount = (amount) => {
    this.setState({amount})
  }

  render() {
    const {stages, projects} = this.state;
    return (
        
      <div>
        <h2>Requisition Form  
          <span className="badge rounded-pill bg-warning m-3">UGX {this.state.amount.toLocaleString("en-us")}</span> 
          {this.renderButton("Submit")}
        </h2>
        <div className="container px-4">
  <div className="row gx-5">
    <div className="col">
    <div className="p-2 border bg-light">{this.renderSelect("project", "Project", projects)} </div>
    </div>
    <div className="col ">
    <div className="p-2 border bg-light"> {this.renderSelect("stage", "Stage", stages)} </div>
    </div>
    <div className="col">
      <div className="p-2 border bg-light form-group"><div>{"Date Required"}</div> <DateUtil selected={new Date()} /></div>
    </div>
  </div>
</div>
        <hr/>
        <RequisitionTable onChangeAmount={this.changeAmount}/>
      </div>
    );
  }
}

export default RequisitionForm;
