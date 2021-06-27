import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import Alert from '../auth/Alert';
import Base from '../Core/Base'
import '../styling/changePasswordPage.scss'
import { isAuthenticated } from '../auth/helper/authBackend'
import { changePassword } from '../user/helper/backend'

const ChangePasswordPage = () => {
    const [inputValues, setInputValues] = useState({
        oldPassword: "",
        newPassword: ""
    });

    const [message, setMessage] = useState(false);
    const [redirectTodo, setRedirectTodo] = useState(false);
    const [redirectProfilePage, setRedirectProfilePage] = useState(false);
    const { oldPassword, newPassword } = inputValues;

    const {token, user } = isAuthenticated();
    
    const handleChange = name => event => {
        setInputValues({ ...inputValues, [name]: event.target.value });
    }

    const onsubmit = event => {
        event.preventDefault();
        changePassword(token, user._id, { "newPassword": newPassword, "oldPassword": oldPassword })
            .then(data => {
                setInputValues({
                    newPassword: "",
                    oldPassword: ""
                });
                if (data.error) {
                    setMessage(data.error);
                }
                if (data.success) {
                    setMessage(data.success);
                }
            })
    }

    const ChangePassword = () => (
        <React.Fragment>
            <div id="sideMenu">
                <ul>
                    <li onClick={() => setRedirectProfilePage(true)}>Profile</li>
                    <li id="currentPage">Change Password</li>
                    <li>Help</li>
                </ul>
            </div>
            <div className="ProfileForm">
                <div id="top">
                    <h3><img alt="back button" id="backButton" onClick={() => setRedirectTodo(true)} src={require("../Core/icons/Back Button.svg")} ></img></h3>
                </div>
                <div className="textBox">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                    <input type="password" placeholder="Old Password" value={oldPassword} onChange={handleChange("oldPassword")} /><br />
                </div>
                <div className="textBox">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                    <input type="password" placeholder="New Password" value={newPassword} onChange={handleChange("newPassword")} /><br />
                </div>
                <div className="submit-btn" onClick={onsubmit}>Change Password</div>
                {message &&
                    <Alert handleAlert={handleAlertMessage} message={message} />
                }
            </div>
        </React.Fragment>
    );

    const handleAlertMessage = (value) => {
        setMessage(value);
    }

    return (
        <Base>
            {ChangePassword()}
            {redirectProfilePage &&
                <Redirect to='/profilePage' />}
            {redirectTodo &&
                <Redirect to='/todo' />}
        </Base>
    )
}

export default ChangePasswordPage
