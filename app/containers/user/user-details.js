import React from 'react';
import { compose } from 'redux';
import withUserLoad from 'hoc/with-user-load';
import withSaveUser from 'hoc/with-save-user';
import LoaderHOC from 'hoc/loader';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
    Icon,
    Input, Modal,
} from 'components/index';
import { Navigation } from 'components/common';

import './user-details.css';

class UserDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            firstName: '',
            lastName: '',
            description: '',
        };
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.load();
        }
        if (prevProps.saveUser.isLoading !== this.props.saveUser.isLoading && this.props.saveUser.error === null) {
            this.setState({
                modal: false,
                firstName: '',
                lastName: '',
                description: '',
            });
            this.load();
        }
    }

    load = () => {
        this.props.loadUser.load();
    };

    handleSave = e => {
        e.preventDefault();
        e.stopPropagation();

        this.props.saveUser.save(this.props.loadUser.details.id, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            description: this.state.description,
        });
    };

    renderModal = () => (
        <Modal onClose={() => {
            this.setState({ modal: false });
        }}
        >
            <LoaderHOC isLoading={this.props.saveUser.isLoading} loadingTextKey="Saving user">
                {this.props.saveUser.error
                && <div className="danger">{this.props.saveUser.error}</div>}
                <h1 className="text-center">Edit user details</h1>
                <form className="resource-form" onSubmit={this.handleSave}>
                    <Input
                        value={this.props.loadUser.details.email}
                        disabled
                    />
                    <Input
                        value={this.props.loadUser.details && this.props.loadUser.details.firstName ? this.props.loadUser.details.firstName : this.state.firstName}
                        placeholder="First name"
                        onChange={value => {
                            this.setState({ firstName: value.trim() });
                        }}
                    />
                    <Input
                        value={this.props.loadUser.details && this.props.loadUser.details.lastName ? this.props.loadUser.details.lastName : this.state.lastName}
                        placeholder="Last name"
                        onChange={value => {
                            this.setState({ lastName: value.trim() });
                        }}
                    />
                    <Input
                        value={this.props.loadUser.details && this.props.loadUser.details.description ? this.props.loadUser.details.description : this.state.description}
                        placeholder="Description"
                        onChange={value => {
                            this.setState({ description: value.trim() });
                        }}
                    />
                    <button type="submit" className="button button-primary">Save</button>
                </form>
            </LoaderHOC>
        </Modal>
    );

    render() {
        return (
            <LoaderHOC isLoading={this.props.loadUser.isLoading} loadingTextKey="Loading user data">
                {this.props.loadUser.error && (
                    <Modal onClose={() => {
                        this.props.loadUser.clearError();
                    }}
                    >
                        <div className="danger">{this.props.loadUser.error}</div>
                    </Modal>
                )}
                {this.state.modal && this.renderModal()}
                <Navigation />
                <div className="user-details-container">
                    <h1 className="text-center">User profile</h1>
                    <button
                        type="button"
                        className="button button-primary"
                        onClick={() => {
                            this.setState({ modal: true });
                        }}
                    >
                        <span>Edit profile</span>
                    </button>
                    <div className="container-item">
                        <div className="details">
                            <div className="details-header">
                                <h2>{this.props.loadUser.details && this.props.loadUser.details.email}</h2>
                                <div>{`Last modified on: ${this.props.loadUser.details && this.props.loadUser.details.modifiedOn ? moment(this.props.loadUser.details.modifiedOn).format('DD/MM/YYYY') : ' - '}`}</div>
                            </div>
                            <hr className="horizontal-line" />
                            <div className="details-content">
                                <div>
                                    <span className="bold">Name: </span>
                                    {this.props.loadUser.details && this.props.loadUser.details.firstName ? this.props.loadUser.details.firstName : ' - '}
                                </div>
                                <div>
                                    <span className="bold">Last name: </span>
                                    {this.props.loadUser.details && this.props.loadUser.details.lastName ? this.props.loadUser.details.lastName : ' - '}
                                </div>
                            </div>
                            <div className="description">
                                <span className="bold">Description: </span>
                                {this.props.loadUser.details && this.props.loadUser.details.description ? this.props.loadUser.details.description : ' - '}
                            </div>
                        </div>
                    </div>
                    <Link to="/" className="back-link">
                        <Icon name="faChevronLeft" />
                        <span>Back to projects</span>
                    </Link>
                </div>
            </LoaderHOC>
        );
    }
}

export default compose(
    withUserLoad,
    withSaveUser,
)(UserDetails);
