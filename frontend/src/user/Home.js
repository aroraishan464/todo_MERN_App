import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Base from '../Core/Base'
import { isAuthenticated } from '../auth/helper/authBackend'

function Home() {
    const [redirect, setRedirect] = useState(false);
    const [signup, setSignupValue] = useState(false);
    
    const RedirectToAuthPage = (signinValue, signupValue, forgotPassValue) => {
        if(signupValue){
            setSignupValue(true);
        }
        const value = signupValue || signinValue || forgotPassValue;
        setRedirect(value);
    }

    return (
        <Base hideActiveBar={true} handleComponentTransition={RedirectToAuthPage}>
            {redirect &&
                <Redirect to={{
                    pathname: "/authPage",
                    state: { signup: signup }
                }} />}
            {isAuthenticated() && <Redirect to="/Todo" />}
        </Base>
    )
}

export default Home
