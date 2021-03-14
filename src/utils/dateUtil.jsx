import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const DateUtil = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState(new Date());
    const handleOnChange = (date) => {
        console.log(date);
        setStartDate(date);
    };
    useEffect(() => {
        onDateChange(startDate);
    }, [startDate]);

    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
        />
    );
};
