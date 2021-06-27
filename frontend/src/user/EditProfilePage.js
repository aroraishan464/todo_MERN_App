import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import Alert from '../auth/Alert';
import Base from '../Core/Base'
import '../styling/editProfilePage.scss'
import { isAuthenticated } from '../auth/helper/authBackend'
import { getUser, updateTheUser } from './helper/backend'

const EditProfilePage = () => {
    const [values, setValues] = useState({
        name: "",
        userInfo: "",
        profilePic: "",
        formData: ""
    });

    const {
        name,
        userInfo,
        formData
    } = values;

    const [message, setMessage] = useState(false);
    const [redirectTodo, setRedirectTodo] = useState(false);
    const [redirectChangePassword, setRedirectChangePassword] = useState(false);
    const [redirectProfile, setRedirectProfile] = useState(false);
    const { token, user } = isAuthenticated();

    useEffect(() => {
        preload(token, user._id);
    }, []);

    const preload = (token, _id) => {
        getUser(token, _id).then(data => {
            if (data.error) {
                setMessage(data.error);
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    userInfo: data.userInfo,
                    formData: new FormData()
                });
            }
        });
    };

    const handleChange = name => event => {
        const value = name === "profilePicture" ? event.target.files[0] : event.target.value;
        // if (name === "profilePic") {
        //     const value = event.target.files[0]
        //     console.log(value);
        //     formData.append("profilePic", event.target.files[0]);
        // }
        // const value = event.target.value;
        formData.append(name, value);
        setValues({ ...values, [name]: value });
    };

    const onsubmit = event => {
        event.preventDefault();
        console.log("onsubmit")
        console.log(event.target)
        const fd = new FormData(event.target);
        fd.append("name", name);
        fd.append("userInfo", userInfo);
        for (var pair of fd.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        updateTheUser(token, user._id, fd)
            .then(data => {
                console.log(data);
                if (data.error) {
                    setMessage(data.error);
                }
                if (data.success) {
                    setMessage(data.success);
                }
            })
    }

    const handleAlertMessage = (value) => {
        setMessage(value);
    }

    const Profile = () => (
        <React.Fragment>
            <div id="sideMenu">
                <ul>
                    <li onClick={() => setRedirectProfile(true)} id="currentPage">Profile</li>
                    <li onClick={() => setRedirectChangePassword(true)}>Change Password</li>
                    <li>Help</li>
                </ul>
            </div>
            {isAuthenticated() &&
                <div className="ProfileForm">
                    <div id="top">
                        <p><img alt="back button" id="backButton" onClick={() => setRedirectTodo(true)} src={require("../Core/icons/Back Button.svg")} ></img></p>

                        <div id="profileDiv"><img id="profilePic" alt="profilePic" src={user.profilePicLink}></img></div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={onsubmit}>
                        <div className="Col">
                            <span className="name">Profile Pic</span>
                            <span className="colon">:</span>
                            <div className="editTextBox fileTextBox">
                                <input
                                    onChange={handleChange("profilePic")}
                                    id="pPIC"
                                    type="file"
                                    name="profilePic"
                                    accept="image"
                                    placeholder="choose file"
                                />
                            </div>
                        </div>
                        <div className="Col">
                            <span className="name">Name</span>
                            <span className="colon">:</span>
                            <div className="editTextBox nameTextBox">
                                <input type="text" placeholder="Name" onChange={handleChange("name")} value={name} /><br />
                            </div>
                        </div>
                        <div className="Col">
                            <span className="name">Email</span>
                            <span className="colon">:</span>
                            <span className="emailvalue">{user.email}</span>
                        </div>
                        <div className="infoCol">
                            <span className="info">User Info</span>
                            <span className="colon1">:</span>
                            <div className="editTextBox editInfoBox">
                                <input type="text" placeholder="User Info" onChange={handleChange("userInfo")} value={userInfo} /><br />
                            </div>
                        </div>
                        <input type="submit" className="changeBtn" value="Submit Changes" />
                    </form>
                    {message &&
                        <Alert handleAlert={handleAlertMessage} message={message} />
                    }
                </div>}
        </React.Fragment>
    );

    return (
        <Base>
            {Profile()}
            {redirectChangePassword &&
                <Redirect to='/changePasswordPage' />}
            {redirectProfile &&
                <Redirect to='/profilePage' />}
            {redirectTodo &&
                <Redirect to='/todo' />}
        </Base>
    )
}

export default EditProfilePage





