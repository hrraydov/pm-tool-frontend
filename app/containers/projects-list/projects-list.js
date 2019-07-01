import React from 'react';
import withLoadProjects from 'hoc/with-load-projects';
import withSaveProject from 'hoc/with-save-project';
import LoaderHOC from 'hoc/loader';
import {
    Icon, Input, List, Modal,
} from 'components';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Navigation } from 'components/common';
import moment from 'moment';

import './projects-list.css';

class ProjectsList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            projectModal: false,
            projectName: '',
            projectDescription: '',
            projectId: null,
        };
    }

    componentDidMount() {
        this.props.loadProjects();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.saveProject.isLoading !== this.props.saveProject.isLoading && this.props.saveProject.error === null) {
            this.setState({
                projectModal: false,
                projectName: '',
                projectDescription: '',
                projectId: null,
            });
            this.props.loadProjects();
        }
    }

    handleSaveProject = e => {
        e.preventDefault();
        e.stopPropagation();

        this.props.saveProject.save({
            name: this.state.projectName,
            description: this.state.projectDescription,
            id: this.state.projectId,
        });
    };

    render() {
        return (
            <LoaderHOC isLoading={this.props.isLoadingProjects} loadingTextKey="Loading projects">
                {this.props.projectsError && (
                    <Modal onClose={() => {
                        this.props.clearProjectsError();
                    }}
                    >
                        <div className="danger">{this.props.projectsError}</div>
                    </Modal>
                )}
                {this.state.projectModal
                && (
                    <Modal onClose={() => {
                        this.setState({ projectModal: false });
                    }}
                    >
                        <LoaderHOC isLoading={this.props.saveProject.isLoading} loadingTextKey="Saving project">
                            {this.props.saveProject.error
                            && <div className="danger">{this.props.saveProject.error}</div>}
                            <h1 className="text-center">{this.state.projectId ? 'Edit project' : 'Create new project'}</h1>
                            <form className="project-form" onSubmit={this.handleSaveProject}>
                                <Input
                                    value={this.state.projectName}
                                    placeholder="Name"
                                    onChange={value => {
                                        this.setState({ projectName: value.trim() });
                                    }}
                                />
                                <Input
                                    value={this.state.projectDescription}
                                    placeholder="Description"
                                    onChange={value => {
                                        this.setState({ projectDescription: value.trim() });
                                    }}
                                />
                                <button type="submit" className="button button-primary">Save</button>
                            </form>
                        </LoaderHOC>
                    </Modal>
                )}
                <Navigation />
                <div className="projects-container">
                    <h1 className="text-center">Projects</h1>
                    <button
                        type="button"
                        className="button button-primary"
                        onClick={() => {
                            this.setState({ projectModal: true });
                        }}
                    >


                        Create new project
                    </button>
                    <List
                        renderItem={item => (
                            <div className="project-item">
                                <div className="details">
                                    <div className="details-header">
                                        <h2>{item.data.name}</h2>
                                        <div>{`Created on: ${moment(item.data.createdOn).format('DD/MM/YYYY')}`}</div>
                                        <div>{`Last modified on: ${moment(item.data.modifiedOn).format('DD/MM/YYYY')}`}</div>
                                    </div>
                                    <div className="description">{item.data.description}</div>
                                </div>
                                <div className="actions">
                                    <button
                                        type="button"
                                        className="button button-primary button-round button-icon"
                                        onClick={() => {
                                            this.setState({
                                                projectModal: true,
                                                projectId: item.data.id,
                                                projectName: item.data.name,
                                                projectDescription: item.data.description,
                                            });
                                        }}
                                    >
                                        <Icon name="faEdit" />
                                    </button>
                                    <Link
                                        to={`/projects/${item.data.id}/tasks`}
                                        className="button button-primary button-round"
                                    >

                                        Select
                                    </Link>
                                </div>
                            </div>
                        )}
                        items={this.props.projects.map(project => ({ key: project.id, data: project }))}
                    />
                </div>
            </LoaderHOC>
        );
    }
}

export default compose(
    withSaveProject,
    withLoadProjects,
)(ProjectsList);
