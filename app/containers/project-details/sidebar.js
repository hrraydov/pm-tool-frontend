import React from 'react';

import './sidebar.css';
import { Icon } from 'components';
import { Link } from 'react-router-dom';
import withCurrentProject from 'hoc/with-current-project';
import { ProjectSelector } from 'containers';

class Sidebar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    setActive = () => {
    };

    render() {
        return (
            <div className="sidebar">
                <Link to="/" className="sidebar-item center">
                    <Icon name="faChevronLeft" />
                    <span className="title">Back to projects</span>
                </Link>
                <ProjectSelector />
                <Link to="/users/:userId/profile" className="sidebar-item">
                    <Icon name="faUser" />
                    <span className="title">Profile</span>
                </Link>
                <Link
                    to={`/projects/${this.props.currentProject.details && this.props.currentProject.details.id}/tasks`}
                    className="sidebar-item"
                >
                    <Icon name="faTasks" />
                    <span className="title">Tasks</span>
                </Link>
                <Link
                    to={`/projects/${this.props.currentProject.details && this.props.currentProject.details.id}/resources`}
                    className="sidebar-item"
                >
                    <Icon name="faBook" />
                    <span className="title">Resources</span>
                </Link>
                <Link
                    to={`/projects/${this.props.currentProject.details && this.props.currentProject.details.id}/budgets`}
                    className="sidebar-item"
                >
                    <Icon name="faWallet" />
                    <span className="title">Budgets</span>
                </Link>
                <div className="end-section">
                    <Link to="#" className="sidebar-item logout">
                        <Icon name="faDoorOpen" />
                        <span className="title">Logout</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default withCurrentProject(Sidebar);
