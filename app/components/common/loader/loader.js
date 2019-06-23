import React from 'react';
import { Strings } from 'helpers';

import './loader.css';

export default ({
    loadingTextKey,
}) => (
    <div className="loader">
        <span className="spinner" />
        {!!loadingTextKey && <span className="loading-text">{loadingTextKey}</span>}
    </div>
);
