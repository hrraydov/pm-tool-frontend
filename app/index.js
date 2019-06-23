import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Router } from 'containers';
import { setInitialLoaderText } from 'helpers';
import { createStore } from './store';

import './index.css';

setInitialLoaderText('loading.app');

const store = createStore();

render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('app'),
);
