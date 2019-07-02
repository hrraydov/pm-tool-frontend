import React from 'react';
import { ProjectsService } from 'services';

const withDeleteProject = WrappedComponent => {
    class WithDeleteProject extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                error: null,
                deleted: false,
            };
        }

        clearError = () => {
            this.setState({
                error: null,
            });
        };

        delete = data => {
            this.setState({
                isLoading: true,
            });

            ProjectsService.delete({
                urlParams: {
                    id: data.id,
                },
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
        };

        render() {
            return React.createElement(WrappedComponent, {
                ...this.props,
                deleteProject: {
                    clearError: this.clearError,
                    delete: this.delete,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithDeleteProject;
};

export default withDeleteProject;
