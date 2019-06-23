import React from 'react';
import { ResourcesService } from 'services';

const withLoadResource = WrappedComponent => {
    class WithLoadResource extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                resources: [],
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
            ResourcesService.getAll({
                urlParams: {
                    projectId,
                },
                query,
            }).then(data => {
                if (this._isMounted) {
                    this.setState({
                        resources: data,
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
                loadResources: {
                    clearError: this.clearError,
                    load: this.load,
                    resources: this.state.resources,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithLoadResource;
};

export default withLoadResource;
