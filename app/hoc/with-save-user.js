import React from 'react';
import { UserService } from 'services';

const withSaveUser = WrappedComponent => {
    class WithSaveUser extends React.PureComponent {
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

        save = (userId, formData) => {
            this.setState({
                isLoading: true,
            });
            UserService.editAccount({
                urlParams: {
                    userId,
                },
                data: formData,
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
                saveUser: {
                    clearError: this.clearError,
                    save: this.save,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithSaveUser;
};

export default withSaveUser;
