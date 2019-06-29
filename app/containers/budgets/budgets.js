import React from 'react';
import { compose } from 'redux';
import LoaderHOC from 'hoc/loader';
import withCurrentProject from 'hoc/with-current-project';
import withSaveBudget from 'hoc/with-save-budget';
import withLoadBudgets from 'hoc/with-load-budgets';
import {
    Icon, Input, List, Modal,
} from 'components/index';

import './budgets.css';

class Budgets extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            description: '',
            amount: '',
            id: null,
        };
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.load();
        }
        if (prevProps.saveBudget.isLoading !== this.props.saveBudget.isLoading && this.props.saveBudget.error === null) {
            this.setState({
                modal: false,
                name: '',
                description: '',
                amount: '',
                id: null,
            });
            this.load();
        }
    }

    load = () => {
        this.props.loadBudgets.load(this.props.match.params.projectId);
    };

    handleSave = e => {
        e.preventDefault();
        e.stopPropagation();

        this.props.saveBudget.save(this.props.currentProject.details.id, {
            name: this.state.name,
            description: this.state.description,
            amount: this.state.amount,
            id: this.state.id,
        });
    };

    renderModal = () => (
        <Modal onClose={() => {
            this.setState({ modal: false });
        }}
        >
            <LoaderHOC isLoading={this.props.saveBudget.isLoading} loadingTextKey="Saving budget">
                {this.props.saveBudget.error
                && <div className="danger">{this.props.saveBudget.error}</div>}
                <h1 className="text-center">{this.state.id ? 'Edit budget' : 'Create new budget'}</h1>
                <form className="budget-form" onSubmit={this.handleSave}>
                    <Input
                        value={this.state.name}
                        placeholder="Name"
                        onChange={value => {
                            this.setState({ name: value.trim() });
                        }}
                    />
                    <Input
                        value={this.state.description}
                        placeholder="Description"
                        onChange={value => {
                            this.setState({ description: value.trim() });
                        }}
                    />
                    <Input
                        value={this.state.amount}
                        placeholder="Amount"
                        onChange={value => {
                            this.setState({ amount: value.trim() });
                        }}
                    />
                    <button type="submit" className="button button-primary">Save</button>
                </form>
            </LoaderHOC>
        </Modal>
    );

    render() {
        return (
            <LoaderHOC isLoading={this.props.loadBudgets.isLoading} loadingTextKey="Loading budgets">
                {this.props.loadBudgets.error && (
                    <Modal onClose={() => {
                        this.props.loadBudgets.clearError();
                    }}
                    >
                        <div className="danger">{this.props.loadBudgets.error}</div>
                    </Modal>
                )}
                {this.state.modal && this.renderModal()}
                <div className="budgets-container">
                    <h1>Budgets</h1>
                    <button
                        type="button"
                        className="button button-primary"
                        onClick={() => {
                            this.setState({ modal: true });
                        }}
                    >
                        <span>Create new budget</span>
                    </button>
                    <List
                        items={this.props.loadBudgets.budgets.map(budget => ({ key: budget.id, data: budget }))}
                        renderItem={item => (
                            <div className="budget-item">
                                <div className="details">
                                    <h3>{item.data.name}</h3>
                                    <div>{item.data.description}</div>
                                    <div>{item.data.amount}</div>
                                </div>
                                <div className="actions">
                                    <button
                                        type="button"
                                        className="button button-primary button-round button-icon"
                                        onClick={() => {
                                            this.setState({
                                                modal: true,
                                                id: item.data.id,
                                                name: item.data.name,
                                                description: item.data.description,
                                                amount: item.data.amount,
                                            });
                                        }}
                                    >
                                        <Icon name="faEdit" />
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </LoaderHOC>
        );
    }
}

export default compose(
    withCurrentProject,
    withSaveBudget,
    withLoadBudgets,
)(Budgets);
