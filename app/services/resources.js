import { createServices } from './helper';

const services = [
    {
        name: 'getAll',
        url: params => `/projects/${params.projectId}/resources`,
        method: 'GET',
    },
    {
        name: 'create',
        url: params => `/projects/${params.projectId}/resources`,
        method: 'POST',
    },
    {
        name: 'edit',
        url: urlParams => `/projects/${urlParams.projectId}/resources/${urlParams.id}`,
        method: 'PUT',
    },
    {
        name: 'delete',
        url: urlParams => `/projects/${urlParams.projectId}/resources/${urlParams.id}`,
        mehtod: 'DELETE',
    },
];

export default createServices(services);
