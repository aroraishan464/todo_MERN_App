import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import Base from '../Core/Base'
import '../styling/profilePage.scss'
import { isAuthenticated } from '../auth/helper/authBackend'

const ProfilePage = () => {
    const [redirectTodo, setRedirectTodo] = useState(false);
    const [redirectChangePassword, setRedirectChangePassword] = useState(false);
    const [redirectEditProfile, setRedirectEditProfile] = useState(false);
    const { user } = isAuthenticated();

    const Profile = () => (
        <React.Fragment>
            <div id="sideMenu">
                <ul>
                    <li id="currentPage">Profile</li>
                    <li onClick={() => setRedirectChangePassword(true)}>Change Password</li>
                    <li>Help</li>
                </ul>
            </div>
            {isAuthenticated() &&
                <div className="ProfileForm">
                <div id="top">
                    <p><img alt="back button" id="backButton" onClick={() => setRedirectTodo(true)} src={require("../Core/icons/Back Button.svg")} ></img></p>
                    <div id="profileDiv"><img id="profilePic" alt="profilePic" src={user.profilePicLink}></img></div>
                    <div id="editProfile" onClick={() => setRedirectEditProfile(true)}>
                        <img alt="edit icon" id="editIcon" src={require("../Core/icons/edit profile icon.svg")}></img>
                        <span>Edit Profile</span>
                    </div>
                </div>
                <div className="Col">
                    <span className="name">Name</span>
                    <span className="colon">:</span>
                    <span className="nameValue">{user.name}</span>
                </div>
                <div className="Col">
                    <span className="name">Email</span>
                    <span className="colon">:</span>
                    <span className="emailvalue">{user.email}</span>
                </div>

                <div className="infoCol">
                    <span className="info">User Info</span>
                    <span className="colon1">:</span>
                    <span className="infovalue">{user.userInfo} </span>
                </div>
            </div>}
        </React.Fragment>
    );

    return (
        <Base>
            {Profile()}
            {redirectChangePassword &&
                <Redirect to='/changePasswordPage' />}
            {redirectEditProfile &&
                <Redirect to='/editProfilePage' />}
            {redirectTodo &&
                <Redirect to='/todo' />}
        </Base>
    )
}

export default ProfilePage
