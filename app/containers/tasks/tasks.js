import React from 'react';
import { compose } from 'redux';
import withLoadTasks from 'hoc/with-load-tasks';
import LoaderHOC from 'hoc/loader';
import {
    Card, Input, Modal,
} from 'components';
import withSaveTask from 'hoc/with-save-task';
import withCurrentProject from 'hoc/with-current-project';
import Select from 'react-select';
import { selectStyles, taskStatuses } from 'helpers/constants';

import './tasks.css';
import withTaskDetails from 'hoc/with-task-details';

class Tasks extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            description: '',
            status: 'To Do',
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
        if (prevProps.saveTask.isLoading !== this.props.saveTask.isLoading && this.props.saveTask.error === null) {
            this.setState({
                modal: false,
                name: '',
                description: '',
                status: 'To Do',
                id: null,
            });
            this.load();
        }
    }

    load = () => {
        this.props.loadTasks.load(this.props.match.params.projectId);
    };

    handleSaveTask = e => {
        e.preventDefault();
        e.stopPropagation();

        this.props.saveTask.save(this.props.currentProject.details.id, {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status,
            id: this.state.id,
        });
    };

    onDragStart = (ev, task) => {
        ev.dataTransfer.setData('id', JSON.stringify(task));
    };

    onDragOver = ev => {
        ev.preventDefault();
    };

    onDrop = (ev, status) => {
        const task = JSON.parse(ev.dataTransfer.getData('id'));
        this.props.saveTask.save(this.props.currentProject.details.id, {
            ...task,
            status,
        });
    };

    getSeparatadTasks = () => {
        const tasksByStatus = {};
        taskStatuses.forEach(status => {
            tasksByStatus[status] = this.props.loadTasks.tasks.filter(task => task.status === status);
        });
        return tasksByStatus;
    };

    openDetailsModal = id => {
        this.props.taskDetails.load(this.props.match.params.projectId, id);
        this.setState({
            detailsModal: true,
        });
    };

    renderModal = () => (
        <Modal onClose={() => {
            this.setState({ modal: false });
        }}
        >
            <LoaderHOC isLoading={this.props.saveTask.isLoading} loadingTextKey="Saving task">
                {this.props.saveTask.error
                    && <div className="danger">{this.props.saveProject.error}</div>}
                <h1 className="text-center">Create new task</h1>
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
        </Modal>
    );

    render() {
        const tasksByStatus = this.getSeparatadTasks();
        return (
            <LoaderHOC isLoading={this.props.loadTasks.isLoading} loadingTextKey="Loading tasks">
                {this.props.loadTasks.error && (
                    <Modal onClose={() => {
                        this.props.loadTasks.clearError();
                    }}
                    >
                        <div className="danger">{this.props.loadTasks.error}</div>
                    </Modal>
                )}
                {this.state.modal && this.renderModal() }
                <div className="tasks-container">
                    <h1>Tasks</h1>
                    <button type="button" className="button button-primary" onClick={() => { this.setState({ modal: true }); }}>Create new task</button>
                    <div className="board">
                        {taskStatuses.map(status => (
                            <div
                                key={status}
                                className="board-col"
                                onDragOver={e => this.onDragOver(e)}
                                onDrop={e => { this.onDrop(e, status); }}
                            >
                                {tasksByStatus[status].length === 0 && (
                                    <div>
                                        <span>No tasks with status</span>
                                        {status}
                                    </div>
                                )}
                                {tasksByStatus[status].map(task => (
                                    <div
                                        onClick={() => {
                                            this.props.history.push(`/projects/${this.props.match.params.projectId}/tasks/${task.id}`);
                                        }}
                                        key={task.id}
                                        draggable
                                        onDragStart={e => this.onDragStart(e, task)}
                                    >
                                        <Card>
                                            <h3>{task.name}</h3>
                                            <div>{task.description}</div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </LoaderHOC>
        );
    }
}

export default compose(
    withCurrentProject,
    withSaveTask,
    withLoadTasks,
    withTaskDetails,
)(Tasks);
