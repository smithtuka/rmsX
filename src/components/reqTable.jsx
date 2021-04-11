import React from "react";
import TableHeader from "./common/tableHeader";
// import TableBody from "./tableBody";
import RequisitionAccordion from "./requisitionAccordion";

const ReqTable = ({ columns, sortColumn, onSort, data }) => {
  return (
    <div>
    <table className="table table-striped table-hover">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      {/* <RequisitionAccordion columns={columns} data={data} /> */}
    </table>
    <table className="table table-striped  table-hover">
      {/* <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} /> */}
      <RequisitionAccordion columns={columns} data={data} />
    </table>
    </div>
  );
};

export default ReqTable;
