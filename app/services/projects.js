import { createServices } from './helper';

const services = [
    {
        name: 'getAll',
        url: '/projects',
        method: 'GET',
    },
    {
        name: 'getOne',
        url: params => `/projects/${params.id}`,
        method: 'GET',
    },
    {
        name: 'create',
        url: '/projects',
        method: 'POST',
    },
    {
        name: 'edit',
        url: urlParams => `/projects/${urlParams.id}`,
        method: 'PUT',
    },
];

export default createServices(services);
