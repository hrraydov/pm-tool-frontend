import React from 'react';
import { compose } from 'redux';
import withTaskDetails from 'hoc/with-task-details';
import withDeleteTask from 'hoc/with-delete-task';
import LoaderHOC from 'hoc/loader';
import { Card, Icon, Modal } from 'components';
import { Link } from 'react-router-dom';
import withLinkTaskWithResource from 'hoc/with-link-task-with-resource';
import List from 'components/common/list/list';
import { ResourceChooser } from 'containers/index';

class TaskDetails extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            linking: false,
            linkResourceModal: false,
        };
    }

    componentDidMount() {
        this.load();
        this.loadLinkedResources();
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.linkedResources);
        console.log(this.props.linkedResources);
        console.log(this.state);
        console.log('-----');
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.load();
            this.loadLinkedResources();
        }
        if (prevProps.linkedResources.isLoading !== this.props.linkedResources.isLoading && this.state.linking) {
            this.setState({
                linking: false,
                linkResourceModal: false,
            }, () => {
                this.loadLinkedResources();
            });
        }
    }

    load = () => {
        this.props.taskDetails.load(this.props.match.params.projectId, this.props.match.params.id);
    };

    loadLinkedResources = () => {
        this.props.linkedResources.load(this.props.match.params.projectId, this.props.match.params.id);
    };

    handleDeleteTask = () => {
        const { match: { params: { projectId, id } }, deleteTask, history } = this.props;

        deleteTask.delete(projectId, { id });

        history.push(`/projects/${projectId}/tasks`);
    };

    render() {
        return (
            <LoaderHOC isLoading={this.props.taskDetails.isLoading} loadingTextKey="Loading task">
                {this.props.taskDetails.error
                && <div className="danger">{this.props.taskDetails.error}</div>}
                {this.state.linkResourceModal && !this.state.linking
                && (
                    <Modal onClose={() => {
                        this.setState({
                            linkResourceModal: false,
                        });
                    }}
                    >
                        <ResourceChooser onChoose={id => {
                            this.setState({
                                linking: true,
                            });
                            this.props.linkedResources.link(this.props.match.params.projectId, this.props.match.params.id, id);
                        }}
                        />
                    </Modal>
                )}
                {this.props.taskDetails.details && (
                    <>
                        <div className="row justify-space-between">
                            <div className="col">
                                <Link
                                    className="row primary"
                                    to={`/projects/${this.props.match.params.projectId}/tasks`}
                                >
                                    <Icon name="faChevronLeft" />
                                    <span>Back</span>
                                </Link>
                            </div>
                            <div className="col">
                                <Link
                                    className="primary"
                                    to={`/projects/${this.props.match.params.projectId}/tasks/${this.props.match.params.id}/edit`}
                                >
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
                        <div className="row">
                            <Card>
                                <h2>Resources</h2>
                                <button
                                    type="button"
                                    className="button button-primary"
                                    onClick={() => {
                                        this.setState({
                                            linkResourceModal: true,
                                        });
                                    }}
                                >
                                    <span>Link</span>
                                </button>
                                <LoaderHOC isLoading={this.props.linkedResources.isLoading}>
                                    <List
                                        items={this.props.linkedResources.resources}
                                        renderItem={resource => (
                                            <div key={resource.id}>
                                                <span>{resource.name}</span>
                                                <button
                                                    type="button"
                                                    className="button button-primary"
                                                    onClick={() => {
                                                        this.setState({
                                                            linking: true,
                                                        });
                                                        this.props.linkedResources.unlink(this.props.match.params.projectId, this.props.match.params.id, resource.id);
                                                    }}
                                                >
                                                    <span>Unlink</span>
                                                </button>
                                            </div>
                                        )}
                                    />
                                </LoaderHOC>
                            </Card>
                        </div>
                    </>
                )}
            </LoaderHOC>
        );
    }
}

export default compose(
    withTaskDetails,
    withDeleteTask,
    withLinkTaskWithResource,
)(TaskDetails);
