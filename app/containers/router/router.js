import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { getAccount } from 'actions/user';
import { setPlatformType } from 'actions/application';
import { getPlatformType, destroyInitialLoader } from 'helpers';
import AuthenticatedRoutes from './authenticated-routes';
import UnauthenticatedRoutes from './unauthenticated-routes';

class Router extends PureComponent {
    constructor(props) {
        super(props);

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        destroyInitialLoader();

        this.props.actions.getAccount();

        window.addEventListener('resize', this.handleResize, false);
    }

    handleResize() {
        const { platformType } = this.props;
        const currentPlatformType = getPlatformType();

        if (currentPlatformType !== platformType) {
            this.props.actions.setPlatformType(currentPlatformType);
        }
    }

    render() {
        const { platformType } = this.props;
        return (
            <BrowserRouter basename={PUBLIC_PATH}>
                <div className={`${platformType.toLowerCase()}`}>
                    { localStorage.getItem('token') ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes /> }
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(
    state => ({
        user: state.user,
        platformType: state.application.platformType,
    }),
    dispatch => ({
        actions: bindActionCreators({ setPlatformType, getAccount }, dispatch),
    }),
)(Router);
