import React from 'react';
import { selectStyles, taskStatuses } from 'helpers/constants';
import LoaderHOC from 'hoc/loader';
import Select from 'react-select';
import { Input } from 'components';
import { compose } from 'redux';
import withSaveTask from 'hoc/with-save-task';
import withTaskDetails from 'hoc/with-task-details';

class TaskEdit extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            id: '',
            status: '',
        };
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.load();
        }
        if (prevProps.taskDetails.isLoading !== this.props.taskDetails.isLoading && this.props.taskDetails.details && this.props.taskDetails.error === null) {
            this.setState({
                name: this.props.taskDetails.details.name,
                id: this.props.taskDetails.details.id,
                description: this.props.taskDetails.details.description,
                status: this.props.taskDetails.details.status,
            });
        }
        if (prevProps.saveTask.isLoading !== this.props.saveTask.isLoading && this.props.saveTask.error === null) {
            this.props.history.push(`/projects/${this.props.match.params.projectId}/tasks/${this.props.match.params.id}`);
        }
    }

    load = () => {
        this.props.taskDetails.load(this.props.match.params.projectId, this.props.match.params.id);
    };

    handleSaveTask = e => {
        e.preventDefault();
        e.stopPropagation();

        this.props.saveTask.save(this.props.match.params.projectId, {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
            id: this.state.id,
        });
    };


    render() {
        return (
            <LoaderHOC isLoading={this.props.saveTask.isLoading || this.props.taskDetails.isLoading} loadingTextKey="Loading task">
                {this.props.saveTask.error
                && <div className="danger">{this.props.saveTask.error}</div>}
                {this.props.taskDetails.error
                && <div className="danger">{this.props.taskDetails.error}</div>}
                <h1 className="text-center">Edit task</h1>
                <form className="project-form" onSubmit={this.handleSaveTask}>
                    <Select
                        styles={selectStyles}
                        value={{ value: this.state.status, label: this.state.status }}
                        options={taskStatuses.map(status => ({ value: status, label: status }))}
                        onChange={selectedValue => {
                            this.setState({
                                status: selectedValue.value,
                            });
                        }}
                    />
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
                    <button type="submit" className="button button-primary">Save</button>
                </form>
            </LoaderHOC>
        );
    }
}

export default compose(
    withSaveTask,
    withTaskDetails,
)(TaskEdit);
