import React from 'react';
import { Link } from 'react-router-dom';

import './navigation.css';

const Navigation = ({ userId, email }) => (
    <div className="navigation">
        <div className="navigation-content">
            <Link to={`/users/${userId}/profile`}>{`Hello, ${email}`}</Link>
            <Link to="#">Logout</Link>
        </div>
    </div>
);

export default Navigation;
