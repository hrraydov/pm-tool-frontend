import React from 'react';
import {ProjectsService, ResourcesService, TasksService} from 'services';

const withSaveResource = WrappedComponent => {
    class WithSaveResource extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                error: null,
                saved: false,
            };
        }

        clearError = () => {
            this.setState({
                error: null,
            });
        };

        save = (projectId, data) => {
            this.setState({
                isLoading: true,
            });
            if (!data.id) {
                ResourcesService.create({
                    urlParams: {
                        projectId,
                    },
                    data,
                }).then(() => {
                }).catch(error => {
                    this.setState({
                        error: error.response.data.error,
                    });
                }).finally(() => {
                    this.setState({
                        isLoading: false,
                    });
                });
            } else {
                const { id, ...rest } = data;
                ResourcesService.edit({
                    urlParams: {
                        projectId,
                        id,
                    },
                    data: rest,
                }).then(() => {
                }).catch(error => {
                    this.setState({
                        error: error.response.data.error,
                    });
                }).finally(() => {
                    this.setState({
                        isLoading: false,
                    });
                });
            }
        };

        render() {
            return React.createElement(WrappedComponent, {
                ...this.props,
                saveResource: {
                    clearError: this.clearError,
                    save: this.save,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithSaveResource;
};

export default withSaveResource;
