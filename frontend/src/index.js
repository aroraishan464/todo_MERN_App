import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
}

ReactDOM.render(<Router />, document.getElementById('root'));

