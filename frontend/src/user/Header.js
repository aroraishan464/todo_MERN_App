import React from 'react'
import { isAuthenticated } from '../auth/helper/authBackend'
import Clock from './Clock';
import '../styling/todoHeader.scss'

const Header = () => {
    const { user } = isAuthenticated();

    return (
        <div className="upper-container">
            {isAuthenticated() &&
                <div className="welcome">
                <p>Welcome<br /><span id="username">{user.name}</span></p>
            </div>}
            <Clock />
        </div>
    )
}

export default Header
