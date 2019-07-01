import { createServices } from './helper';

const services = [
    {
        name: 'login',
        url: '/auth/token',
        method: 'POST',
        authorized: false,
    },
    {
        name: 'register',
        url: '/users',
        method: 'POST',
        authorized: false,
    },
    {
        name: 'getAccount',
        url: '/users/account',
        method: 'GET',
    },
    {
        name: 'editAccount',
        url: urlParams => `/users/${urlParams.userId}`,
        method: 'PUT',
    },
];

const mocks = {

};

export default createServices(services, mocks);
