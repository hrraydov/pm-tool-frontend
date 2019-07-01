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
        name: 'changeAccountData',
        url: params => `/users/${params.userId}/account`,
        method: 'POST',
    },
];

const mocks = {

};

export default createServices(services, mocks);
