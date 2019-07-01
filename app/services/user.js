import ResultsResponse from 'mocks/results.json';
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
        url: params => `/users/${params.userId}/account`,
        method: 'GET',
    },
    {
        name: 'changeAccountData',
        url: params => `/users/${params.userId}/account`,
        method: 'POST',
    },
];

const mocks = {
    getAccount: ResultsResponse,
};

export default createServices(services, mocks);
