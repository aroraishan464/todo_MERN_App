import React, { useState, useEffect } from 'react';
import '../styling/alert.scss';

const Alert = ({ message, handleAlert }) => {
    const [opacity, setOpacity] = useState("0")
    useEffect(() => {
        setOpacity("1");
    }, []);

    const removeAlert = () => {
        setOpacity("0");
        window.setTimeout(() => {
            handleAlert(false);
        }, 800);
    }

    return (
        <div className="alert" style={{ opacity: opacity }}>
            <span>{message}</span>
            <i className="fa fa-times" aria-hidden="true" onClick={removeAlert}></i>
        </div>
    )
}

export default Alert
