import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Switch,
    Route,
    Redirect,
    withRouter,
} from 'react-router-dom';
import { ProjectsList, ProjectDetails, UserDetails } from 'containers';

const AuthenticatedRoutes = () => (
    <Switch>
        <Route exact path="/" component={ProjectsList} />
        <Route path="/projects/:projectId" component={ProjectDetails} />
        <Route path="/profile" component={UserDetails} />
        <Redirect to="/" />
    </Switch>
);

export default withRouter(connect(
    () => ({}),
    dispatch => ({
        actions: bindActionCreators({}, dispatch),
    }),
)(AuthenticatedRoutes));
