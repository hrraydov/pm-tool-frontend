import { createServices } from './helper';

const services = [
    {
        name: 'getAll',
        url: params => `/projects/${params.projectId}/tasks`,
        method: 'GET',
    },
    {
        name: 'getOne',
        url: params => `/projects/${params.projectId}/tasks/${params.id}`,
        method: 'GET',
    },
    {
        name: 'create',
        url: params => `/projects/${params.projectId}/tasks`,
        method: 'POST',
    },
    {
        name: 'edit',
        url: urlParams => `/projects/${urlParams.projectId}/tasks/${urlParams.id}`,
        method: 'PUT',
    },
];

export default createServices(services);
