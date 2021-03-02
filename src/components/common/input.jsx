import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group m-4" style={{display:"inline-block"}}>
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
