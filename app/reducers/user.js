import { reducer } from 'helpers';

export default reducer({
    isLoggingIn: false,
    isLoadingUserData: true,
}, {
    GET_ACCOUNT_REQUEST: state => ({
        ...state,
        isLoadingUserData: true,
    }),
    GET_ACCOUNT_REQUEST_END: state => ({
        ...state,
        isLoadingUserData: false,
    }),
    LOGIN_REQUEST: state => ({
        ...state,
        isLoggingIn: true,
    }),
    LOGIN_REQUEST_END: state => ({
        ...state,
        isLoggingIn: false,
    }),
    SET_USER_DATA: (state, { user }) => ({
        ...state,
        ...user,
    }),
    LOGOUT: () => ({
        isLoggingIn: false,
        isLoadingUserData: false,
    }),
});
