import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
    return (
        <div className={'form-group'}>
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} {...rest} className="form-control">
                <option key="none" disabled selected value>
                    -- select a {label} --
                </option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;
