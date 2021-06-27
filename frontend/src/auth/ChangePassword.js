import React, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import Base from '../Core/Base';
import Alert from './Alert';
import { resetPassword } from './helper/authBackend';

function ChangePassword() {
    const [inputValues, setInputValues] = useState({
        password: ""
    });

    const [message, setMessage] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { password } = inputValues;

    const handleChange = name => event => {
        setInputValues({ ...inputValues, [name]: event.target.value });
    }
    
    let { token } = useParams();
    const onSubmit = event => {
        event.preventDefault();
        resetPassword({ password }, token)
            .then(data => {
                if (data.error) {
                    setMessage(data.error);
                }
                if (data.success) {
                    setRedirect(true);
                }
            });
    }

    const resetPassForm = () => (
        <div className="Form">
            <h1>Reset Password</h1>
            <div className="textBox">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input type="password" placeholder="new password" value={password} onChange={handleChange("password")} /><br />
            </div>
            <p className="submit-btn" onClick={onSubmit}>Reset</p>
            <h4> </h4>
        </div>
    );

    const handleAlertMessage = (value) => {
        setMessage(value);
    }

    return (
        <Base hideMenu={true}>
            {resetPassForm()}
            {message &&
                <Alert handleAlert={handleAlertMessage} message={message} />
            }
            {redirect && <Redirect to="/authPage" />}
        </Base>
    )
}

export default ChangePassword
