import React from 'react';
import { compose } from 'redux';
import withTaskDetails from 'hoc/with-task-details';
import withDeleteTask from 'hoc/with-delete-task';
import LoaderHOC from 'hoc/loader';
import { Card, Icon } from 'components';
import { Link } from 'react-router-dom';

class TaskDetails extends React.PureComponent {
    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.load();
        }
    }

    load = () => {
        this.props.taskDetails.load(this.props.match.params.projectId, this.props.match.params.id);
    };

    handleDeleteTask = () => {
        const { match: { params: { projectId, id } }, deleteTask, history } = this.props;

        deleteTask.delete(projectId, { id });

        history.push(`/projects/${projectId}/tasks`);
    }

    render() {
        return (
            <LoaderHOC isLoading={this.props.taskDetails.isLoading} loadingTextKey="Loading task">
                {this.props.taskDetails.error
                    && <div className="danger">{this.props.taskDetails.error}</div>}
                {this.props.taskDetails.details && (
                    <>
                        <div className="row justify-space-between">
                            <div className="col">
                                <Link className="row primary" to={`/projects/${this.props.match.params.projectId}/tasks`}>
                                    <Icon name="faChevronLeft" />
                                    <span>Back</span>
                                </Link>
                            </div>
                            <div className="col">
                                <Link className="primary" to={`/projects/${this.props.match.params.projectId}/tasks/${this.props.match.params.id}/edit`}>
                                    <Icon name="faEdit" />
                                </Link>
                                <Icon
                                    className="delete-icon primary"
                                    name="faTrashAlt"
                                    onClick={() => this.handleDeleteTask()}
                                />
                            </div>
                        </div>
                        <h1 className="text-center">{`${this.props.taskDetails.details.name} (${this.props.taskDetails.details.status})`}</h1>
                        <Card>
                            <div>{this.props.taskDetails.details.description}</div>
                        </Card>
                        <h1>Linked</h1>
                        <Card />
                    </>
                )}
            </LoaderHOC>
        );
    }
}

export default compose(
    withTaskDetails,
    withDeleteTask,
)(TaskDetails);
