import React from 'react';
import LoaderHOC from 'hoc/loader';
import { ProjectsService } from 'services';

const withLoadProjects = WrappedComponent => {
    class WithLoadProjects extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                projects: [],
                error: null,
            };
        }

        clearError = () => {
            this.setState({
                error: null,
            });
        };

        componentDidMount() {
            this._isMounted = true;
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        loadProjects = query => {
            this.setState({
                isLoading: true,
            });
            ProjectsService.getAll({
                query,
            }).then(data => {
                if (this._isMounted) {
                    this.setState({
                        projects: data,
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
                clearProjectsError: this.clearError,
                loadProjects: this.loadProjects,
                projects: this.state.projects,
                projectsError: this.state.error,
                isLoadingProjects: this.state.isLoading,
            });
        }
    }

    return WithLoadProjects;
};

export default withLoadProjects;
