import React from 'react';
import { BudgetsService } from 'services';

const withDeleteBudget = WrappedComponent => {
    class WithDeleteBudget extends React.PureComponent {
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

        delete = (projectId, data) => {
            this.setState({
                isLoading: true,
            });
            BudgetsService.delete({
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
                deleteBudget: {
                    clearError: this.clearError,
                    delete: this.delete,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithDeleteBudget;
};

export default withDeleteBudget;
