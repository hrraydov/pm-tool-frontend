import axios from 'axios';
import JSONHeaders from './headers';

const instance = axios.create({
    baseURL: '/api',
    timeout: 20000,
});

export const getAxiosInstance = () => instance;

export const serviceBind = ({
    authorized = true,
    headers = { ...JSONHeaders },
    url,
    ...rest
}, mockedResponse) => ({
    params,
    data,
    urlParams = {},
    pathname = '',
} = {}) => new Promise((resolve, reject) => {
    const authorizationHeaders = {};

    if (authorized) {
        const token = localStorage.getItem('token');

        authorizationHeaders.Authorization = `Bearer ${token}`;
    }

    const baseURL = urlParams && typeof url !== 'string' ? url(urlParams) : url;
    const request = {
        ...rest,
        headers: {
            ...headers,
            ...authorizationHeaders,
        },
        url: `${baseURL}${pathname}`,
        params,
        data,
    };

    if (mockedResponse) {
        setTimeout(() => resolve(mockedResponse), 200);
    } else {
        instance.request(request).then(({ data }) => {
            resolve(data);
        }, reject);
    }
});

export const createServices = (services, mocks) => services.reduce((currentServices, { name, ...service }) => ({
    ...currentServices,
    [name]: serviceBind(service, mocks ? mocks[name] : null),
}), {});
