import React from 'react';
import { TasksService } from 'services';

const withDeleteTask = WrappedComponent => {
    class WithDeleteTask extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                error: null,
                deletedd: false,
            };
        }

        clearError = () => {
            this.setState({
                error: null,
            });
        };

        delete = (projectId, data) => {
            this.setState({
                isLoading: true,
            });
            TasksService.edit({
                urlParams: {
                    projectId,
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
                deleteTask: {
                    clearError: this.clearError,
                    delete: this.delete,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithDeleteTask;
};

export default withDeleteTask;
