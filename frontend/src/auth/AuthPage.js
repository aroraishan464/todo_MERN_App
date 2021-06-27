import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { withRouter } from 'react-router-dom';

import '../styling/authTransition.scss'
import Base from '../Core/Base';
import Signin from './Signin';
import Signup from './Signup';
import ForgotPass from './ForgotPass';

const AuthPage = ({ location }) => {
    
    const [currentComponent, setCurrentComponent] = useState({
        signin: location.state ? !location.state.signup: true,
        signup: location.state ? location.state.signup: false,
        forgotPass: false
    });
    const { forgotPass, signin, signup } = currentComponent;
    
    const handleComponentTransition = (signinValue, signupValue, forgotPassValue) => {
        setCurrentComponent({
            signin: signinValue,
            signup: signupValue,
            forgotPass: forgotPassValue
        });
    }

    return (
        <Base handleComponentTransition={handleComponentTransition}
            hideActiveBar={forgotPass || !((signin || signup) && !forgotPass)} signupBar={signup}>
            <CSSTransition
                in={signin}
                timeout={{
                    appear: 500,
                    enter: 500,
                    exit: 0,
                }}
                classNames="component"
                unmountOnExit
            >
                <Signin handleComponentTransition={handleComponentTransition} />
            </CSSTransition>
            <CSSTransition
                in={signup}
                timeout={{
                    appear: 500,
                    enter: 500,
                    exit: 0,
                }}
                classNames="component"
                unmountOnExit
            >
                <Signup />
            </CSSTransition>
            <CSSTransition
                in={forgotPass}
                timeout={{
                    appear: 500,
                    enter: 500,
                    exit: 0,
                }}
                classNames="component"
                unmountOnExit
            >
                <ForgotPass handleComponentTransition={handleComponentTransition} />
            </CSSTransition>
        </Base>
    )
}

export default withRouter(AuthPage)
