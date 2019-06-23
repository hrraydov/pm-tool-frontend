import React from 'react';
import PropTypes from 'prop-types';
import { NoData } from 'components';

const NoDataHOC = ({
    hasData,
    textKey,
    children,
}) => (
    !hasData ? <NoData textKey={textKey} /> : children
);

NoDataHOC.defaultProps = {
    children: null,
};

NoDataHOC.propTypes = {
    hasData: PropTypes.bool.isRequired,
    children: PropTypes.node,
};

export default NoDataHOC;
