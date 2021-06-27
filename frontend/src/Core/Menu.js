import React, { useState } from 'react';
import '../styling/menu.scss';
import {withRouter} from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper/authBackend';

const Menu = ({ handleComponentTransition, hideMenu, hideActiveBar, signupBar, history }) => {
    
    const [activeBar, setActiveBar] = useState(signupBar? "5.6vh": "20.5vh");
    
    const handleActiveBarAnimation = (value, signinValue, signupValue, forgetPassValue) => {
        setActiveBar(value);
        handleComponentTransition(signinValue, signupValue, forgetPassValue);
    }

    const {user} = isAuthenticated();

    return (
        <div className="menu">
            <span><img alt="logo" id="logo" src={require("./icons/Logo.svg")} /></span>
            {
                !hideMenu &&
                <ul>
                    {!isAuthenticated() && 
                        <React.Fragment>
                        <li onClick={() => handleActiveBarAnimation("5.6vh", false, true, false)}>SIGNUP</li>
                        <li onClick={() => handleActiveBarAnimation("20.5vh", true, false, false)}>SIGNIN</li>
                        {!hideActiveBar && <div id="active-bar" style={{ right: activeBar }}></div>}
                        </React.Fragment>
                    }
                    {isAuthenticated() && 
                        <li onClick={() => {signout(() => history.push("/"))}}>SIGNOUT</li>}
                </ul>
            }
            
            {
                isAuthenticated() ? (user.profilePicLink ?
                <span><img alt="profileIcon" id="profileIcon" onClick={() => history.push("/profilePage")} src={user.profilePicLink} /></span>:
                <span><img alt="profileIcon" id="profileIcon" onClick={() => history.push("/profilePage")} src={require("./icons/profile Icon.svg")} /></span>):
                <span><img alt="profileIcon" id="profileIcon" src={require("./icons/profile Icon.svg")} /></span>
            }
        </div>
    )
}

export default withRouter(Menu)
