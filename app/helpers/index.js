import Constants from './constants';

export { default as Constants } from './constants';

export const getPlatformType = () => {
    const { clientWidth } = document.documentElement;
    const { MOBILE, TABLET, DESKTOP } = Constants.PlatformTypes;

    if (clientWidth < 500) {
        return MOBILE;
    }

    if (clientWidth < 1000) {
        return TABLET;
    }

    return DESKTOP;
};

export const reducer = (initialState, reducers) => (state = initialState, action = {}) => (
    reducers[action.type] ? reducers[action.type](state, action) : state
);

export const destroyInitialLoader = () => {
    const loader = document.getElementById('initial-loader');

    if (loader) {
        loader.remove();
    }
};

export const setInitialLoaderText = key => {
    const loaderText = document.getElementById('initial-loader-text');

    if (loaderText) {
        loaderText.innerHTML = 'Loading';
    }
};
