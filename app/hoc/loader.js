import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'components/common';

const LoaderHOC = ({
    isLoading,
    loadingTextKey,
    children,
}) => (
    isLoading ? <Loader loadingTextKey={loadingTextKey} /> : children
);

LoaderHOC.defaultProps = {
    children: null,
    loadingTextKey: null,
};

LoaderHOC.propTypes = {
    children: PropTypes.node,
    loadingTextKey: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
};

export default LoaderHOC;
