import React from 'react';
import { UserService } from 'services';

const withUserLoad = WrappedComponent => {
    class WithUserLoad extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                details: null,
                error: null,
            };
        }

        componentDidMount() {
            this._mounted = true;
        }

        componentWillUnmount() {
            this._mounted = false;
        }

        clearError = () => {
            this.setState({
                error: null,
            });
        };

        load = () => {
            this.setState({
                isLoading: true,
            });
            UserService.getAccount()
                .then(data => {
                    if (this._mounted) {
                        this.setState({
                            details: data,
                        });
                    }
                }).catch(error => {
                    if (this._mounted) {
                        this.setState({
                            error: error.response.data.error,
                        });
                    }
                }).finally(() => {
                    if (this._mounted) {
                        this.setState({
                            isLoading: false,
                        });
                    }
                });
        };

        render() {
            return React.createElement(WrappedComponent, {
                ...this.props,
                loadUser: {
                    clearError: this.clearError,
                    load: this.load,
                    details: this.state.details,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithUserLoad;
};

export default withUserLoad;
