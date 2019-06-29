import React from 'react';
import { BudgetsService } from 'services';

const withLoadBudgets = WrappedComponent => {
    class WithLoadBudgets extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: false,
                budgets: [],
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
            BudgetsService.getAll({
                urlParams: {
                    projectId,
                },
                query,
            }).then(data => {
                if (this._isMounted) {
                    this.setState({
                        budgets: data,
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
                loadBudgets: {
                    clearError: this.clearError,
                    load: this.load,
                    budgets: this.state.budgets,
                    error: this.state.error,
                    isLoading: this.state.isLoading,
                },
            });
        }
    }

    return WithLoadBudgets;
};

export default withLoadBudgets;
