import React from 'react';
import { TasksService } from 'services';

const withLinkTaskWithResource = WrappedComponent => {
    class WithLinkTaskWithResource extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                linked: [],
                isLoading: false,
            };
        }

        link = (projectId, taskId, resourceId) => {
            this.setState({
                isLoading: true,
            });
            TasksService.linkResource({
                urlParams: {
                    projectId,
                    taskId,
                    resourceId,
                },
            }).then(data => {
            }).catch(error => {
            }).finally(() => {
                this.setState({
                    isLoading: false,
                });
            });
        };

        unlink = (projectId, taskId, resourceId) => {
            this.setState({
                isLoading: true,
            });
            TasksService.unlinkResource({
                urlParams: {
                    projectId,
                    taskId,
                    resourceId,
                },
            }).then(data => {
            }).catch(error => {
            }).finally(() => {
                this.setState({
                    isLoading: false,
                });
            });
        };

        loadLinked = (projectId, taskId) => {
            this.setState({
                isLoading: true,
            });
            TasksService.getLinkedResources({
                urlParams: {
                    projectId,
                    taskId,
                },
            }).then(data => {
                this.setState({
                    linked: data,
                });
            }).catch(error => {
            }).finally(() => {
                this.setState({
                    isLoading: false,
                });
            });
        };

        render() {
            return React.createElement(
                WrappedComponent,
                {
                    ...this.props,
                    linkedResources: {
                        isLoading: this.state.isLoading,
                        resources: this.state.linked,
                        load: this.loadLinked,
                        link: this.link,
                        unlink: this.unlink,
                    },
                },
            );
        }
    }

    return WithLinkTaskWithResource;
};

export default withLinkTaskWithResource;
