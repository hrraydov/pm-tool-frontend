import React from 'react';
import { TasksService } from 'services';

const withLoadTasks = WrappedComponent => {
    class WithLoadTasks extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                tasks: [],
                error: null,
            };
        }


        componentDidMount() {
            this._isMounted = true;
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        clearError = () => {
            this.setState({
                error: null,
            });
        };

        load = (projectId, query) => {
            this.setState({
                isLoading: true,
            });
            TasksService.getAll({
                urlParams: {
                    projectId,
                },
                query,
            }).then(data => {
                if (this._isMounted) {
                    this.setState({
                        tasks: data,
                    });
                }
            }).catch(error => {
                if (this._isMounted) {
                    this.setState({
                        error: error.response.data.error,
                    });
                }
            }).finally(() => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false,
                    });
                }
            });
        };

        render() {
            return React.createElement(WrappedComponent, {
                ...this.props,
                loadTasks: {
                    clearError: this.clearError,
                    load: this.load,
                    tasks: this.state.tasks,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithLoadTasks;
};

export default withLoadTasks;
