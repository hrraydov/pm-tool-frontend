import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Strings } from 'helpers';

import './application.css';

const Application = () => (
    <div />
);

export default connect(
    () => ({}),
    dispatch => ({
        actions: bindActionCreators({}, dispatch),
    }),
)(Application);
