import React from 'react'
import Menu from './Menu';

const Base = ({ children, handleComponentTransition, hideMenu, hideActiveBar, signupBar }) => {
    return (
        <React.Fragment>
            <Menu handleComponentTransition={handleComponentTransition}
                hideMenu={hideMenu} hideActiveBar={hideActiveBar} signupBar={signupBar} />
            <React.Fragment>{children}</React.Fragment>
        </React.Fragment>
    )
}

Base.defaultProps = {
    hideMenu: false,
    hideActiveBar: false,
    signupBar: false
}

export default Base
