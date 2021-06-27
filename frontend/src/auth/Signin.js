import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import '../styling/authForm.scss';
import Alert from './Alert';
import { signin, authenticate } from './helper/authBackend';

const Signin = ({ handleComponentTransition }) => {
    const [inputValues, setInputValues] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const { email, password } = inputValues;

    const handleChange = name => event => {
        setInputValues({ ...inputValues, [name]: event.target.value });
    }

    const onsubmit = event => {
        event.preventDefault();
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setMessage(data.error);
                }
                else {
                    authenticate(data, () => {
                        setRedirect(true);
                    });
                }
            })
    }

    const signinForm = () => (
        <div className="Form">
            <h1>Signin</h1>
            <div className="textBox">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <input type="email" placeholder="email" value={email} onChange={handleChange("email")} /><br />
            </div>
            <div className="textBox">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input type="password" placeholder="password" value={password} onChange={handleChange("password")} /><br />
            </div>
            <div className="submit-btn" onClick={onsubmit}>Sign in</div>

            <h4 onClick={() => handleComponentTransition(false, false, true)}>Forgot password</h4><br />
        </div>
    )

    const handleAlertMessage = (value) => {
        setMessage(value);
    }

    return (
        <React.Fragment>
            {signinForm()}
            {message &&
                <Alert handleAlert={handleAlertMessage} message={message} />
            }
            {redirect &&
                <Redirect to='/todo' />}
        </React.Fragment>
    )
}

export default Signin
