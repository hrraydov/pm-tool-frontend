import React from 'react';
import { ProjectsService } from 'services';

const withSaveProject = WrappedComponent => {
    class WithSaveProject extends React.PureComponent {
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

        save = data => {
            this.setState({
                isLoading: true,
            });
            if (!data.id) {
                ProjectsService.create({
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
                ProjectsService.edit({
                    urlParams: {
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
                saveProject: {
                    clearError: this.clearError,
                    save: this.save,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithSaveProject;
};

export default withSaveProject;
