import React from 'react';
import { BudgetsService } from 'services';

const withSaveBudget = WrappedComponent => {
    class WithSaveBudget extends React.PureComponent {
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
                BudgetsService.create({
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
                BudgetsService.edit({
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
                saveBudget: {
                    clearError: this.clearError,
                    save: this.save,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithSaveBudget;
};

export default withSaveBudget;
