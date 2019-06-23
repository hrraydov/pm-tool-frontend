import { UserService } from 'services';

export const getAccount = () => dispatch => {
    dispatch({ type: 'GET_ACCOUNT_REQUEST' });

    UserService.getAccount().then(user => {
        dispatch({ type: 'SET_USER_DATA', user });
    }, () => {
        // console.log('Login error', error);
    }).finally(() => {
        dispatch({ type: 'GET_ACCOUNT_REQUEST_END' });
    });
};

export const login = () => dispatch => {
    dispatch({ type: 'LOGIN_ACCOUNT_REQUEST' });

    UserService.login().then(user => {
        dispatch({ type: 'SET_USER_DATA', user });
    }, () => {
        // console.log('Login error', error);
    }).finally(() => {
        dispatch({ type: 'LOGIN_ACCOUNT_REQUEST_END' });
    });
};
