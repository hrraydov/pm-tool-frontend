import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register, Login } from 'containers';

export default () => (
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

        <Redirect to="/login" />
    </Switch>
);
