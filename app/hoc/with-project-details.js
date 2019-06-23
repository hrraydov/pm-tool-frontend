import React from 'react';
import { ProjectsService } from 'services';

const withProjectDetails = WrappedComponent => {
    class WithProjectDetails extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                details: null,
                error: null,
            };
        }

        clearError = () => {
            this.setState({
                error: null,
            });
        };

        load = id => {
            this.setState({
                isLoading: true,
            });
            ProjectsService.getOne({
                urlParams: {
                    id,
                },
            }).then(data => {
                this.setState({
                    details: data,
                });
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
                projectDetails: {
                    clearError: this.clearError,
                    load: this.load,
                    details: this.state.details,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithProjectDetails;
};

export default withProjectDetails;
