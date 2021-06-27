import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './styling/routesTransition.scss';

import AuthPage from './auth/AuthPage'
import Home from './user/Home'
import Todo from './user/Todo'
import ChangePassword from './auth/ChangePassword'
import ProfilePage from './user/ProfilePage'
import ChangePasswordPage from './user/ChangePasswordPage'
import EditProfilePage from './user/EditProfilePage'

const Routes = ({ location }) => {
    return (
        <TransitionGroup className="transition-group">
            <CSSTransition
                key={location.key}
                timeout={{ enter: 300, exit: 300 }}
                classNames="fade"
            >
                <section className="route-section">
                    <Switch location={location}>
                        <Route path="/" exact component={Home} />
                        <Route path="/authPage" exact component={AuthPage} />
                        <Route path="/todo" exact component={Todo} />
                        <Route path="/reset-password/:token" exact component={ChangePassword} />
                        <Route path="/profilePage" exact component={ProfilePage} />
                        <Route path="/changePasswordPage" exact component={ChangePasswordPage} />                        
                        <Route path="/editProfilePage" exact component={EditProfilePage} />                        
                    </Switch>
                </section>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default withRouter(Routes)
