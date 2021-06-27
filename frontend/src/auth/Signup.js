import React, { useState } from 'react'
import '../styling/authForm.scss'
import { signup } from './helper/authBackend';
import Alert from './Alert';

function Signin() {
    const [inputValues, setInputValues] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState(false);
    const { name, email, password } = inputValues;

    const handleChange = name => event => {
        setInputValues({ ...inputValues, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        signup({ name, email, password })
            .then(data => {
                if(data.error){
                    setMessage(data.error);
                }
                if(data.success){
                    setInputValues({
                        name: "",
                        email: "",
                        password: ""
                    });
                    setMessage(data.success);
                }
            });
    }

    const signupForm = () => (
        <div className="Form">
            <h1>SignUp</h1>
            <div className="textBox">
                <i className="fa fa-user" aria-hidden="true"></i>
                <input type="text" placeholder="name" value={name} onChange={handleChange("name")} /><br />
            </div>
            <div className="textBox">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                <input type="email" placeholder="email" value={email} onChange={handleChange("email")} /><br />
            </div>
            <div className="textBox">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input type="password" placeholder="password" value={password} onChange={handleChange("password")} /><br />
            </div>
            <p className="submit-btn" onClick={onSubmit}>Sign up</p>
            <h3> </h3>
        </div>
    )

    const handleAlertMessage = (value) => {
        setMessage(value);
    }

    return (
        <React.Fragment>
            {signupForm()}
            {message &&
                <Alert handleAlert={handleAlertMessage} message={message} />
            }
        </React.Fragment>
    )
}

export default Signin
