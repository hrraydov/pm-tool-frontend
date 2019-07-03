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
    {
        name: 'delete',
        url: urlParams => `/projects/${urlParams.projectId}/tasks/${urlParams.id}`,
        method: 'DELETE',
    },
    {
        name: 'getLinkedResources',
        url: urlParams => `/projects/${urlParams.projectId}/tasks/${urlParams.taskId}/resources`,
        method: 'GET',
    },
    {
        name: 'linkResource',
        url: urlParams => `/projects/${urlParams.projectId}/tasks/${urlParams.taskId}/resources/${urlParams.resourceId}/link`,
        method: 'POST',
    },
    {
        name: 'unlinkResource',
        url: urlParams => `/projects/${urlParams.projectId}/tasks/${urlParams.taskId}/resources/${urlParams.resourceId}`,
        method: 'DELETE',
    },
];

export default createServices(services);
