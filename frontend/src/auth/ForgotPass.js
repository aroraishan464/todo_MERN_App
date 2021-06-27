import React, { useState } from 'react'
import { forgotPassword } from './helper/authBackend';
import Alert from './Alert';

const ForgotPass = ({ handleComponentTransition }) => {
    const [inputValues, setInputValues] = useState({
        email: ""
    });

    const [message, setMessage] = useState(false);
    const { email } = inputValues;

    const handleChange = name => event => {
        setInputValues({ ...inputValues, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        forgotPassword({ email })
            .then(data => {
                if (data.error) {
                    setMessage(data.error);
                }
                if (data.success) {
                    setInputValues({
                        email: ""
                    });
                    setMessage(data.success);
                }
            });
    }

    const forgotPassForm = () => (
        <div className="Form">
            <h1>Forgot Password</h1>
            <div className="textBox">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <input type="email" placeholder="email" value={email} onChange={handleChange("email")} /><br />
            </div>
            <p className="submit-btn" onClick={onSubmit}>Send Email</p>
            <h3 onClick={() => handleComponentTransition(true, false, false)}><img alt="back button" id="backButton" src={require("../Core/icons/Back Button.svg")}></img></h3>
        </div>
    );

    const handleAlertMessage = (value) => {
        setMessage(value);
    }

    return (
        <React.Fragment>
            {forgotPassForm()}
            {message &&
                <Alert handleAlert={handleAlertMessage} message={message} />
            }
        </React.Fragment>
    )
}

export default ForgotPass
