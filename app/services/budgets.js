import { createServices } from './helper';

const services = [
    {
        name: 'getAll',
        url: params => `/projects/${params.projectId}/budgets`,
        method: 'GET',
    },
    {
        name: 'create',
        url: params => `/projects/${params.projectId}/budgets`,
        method: 'POST',
    },
    {
        name: 'edit',
        url: urlParams => `/projects/${urlParams.projectId}/budgets/${urlParams.id}`,
        method: 'PUT',
    },
    {
        name: 'delete',
        url: urlParams => `/projects/${urlParams.projectId}/budgets/${urlParams.id}`,
        method: 'DELETE',
    },
];

export default createServices(services);
