import React from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import withUserLoad from 'hoc/with-user-load';

import './navigation.css';

class Navigation extends React.PureComponent {
    componentDidMount() {
        this.load();
    }

    load = () => {
        this.props.loadUser.load();
    };

    onLogoutClick = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    render() {
        return (
            <div className="navigation">
                <div className="navigation-content">
                    <Link to="/profile">{`Hello, ${this.props.loadUser.details && this.props.loadUser.details.email}`}</Link>
                    <Link to="#" onClick={this.onLogoutClick}>Logout</Link>
                </div>
            </div>
        );
    }
}

export default compose(
    withUserLoad,
)(Navigation);
