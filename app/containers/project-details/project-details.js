import React from 'react';

import './project-details.css';
import {
    Sidebar, Tasks, Resources, TaskDetails, TaskEdit,
} from 'containers';
import { Redirect, Route, Switch } from 'react-router-dom';
import withProjectDetails from 'hoc/with-project-details';
import LoaderHOC from 'hoc/loader';
import { compose } from 'redux';
import withCurrentProject from 'hoc/with-current-project';


class ProjectDetails extends React.PureComponent {
    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.projectId !== this.props.match.params.projectId) {
            this.load();
        }
        if (prevProps.projectDetails.isLoading !== this.props.projectDetails.isLoading && this.props.details !== null) {
            this.props.currentProject.setCurrentProject(this.props.projectDetails.details);
        }
    }

    load = () => {
        this.props.projectDetails.load(this.props.match.params.projectId);
    };

    render() {
        return (
            <LoaderHOC isLoading={this.props.projectDetails.isLoading} loadingTextKey="Loading project">
                <div className="project-details-container">
                    <Sidebar />
                    <div className="content">
                        <Switch>
                            <Route exact path="/projects/:projectId/tasks" component={Tasks} />
                            <Route exact path="/projects/:projectId/tasks/:id" component={TaskDetails} />
                            <Route exact path="/projects/:projectId/tasks/:id/edit" component={TaskEdit} />
                            <Route exact path="/projects/:projectId/resources" component={Resources} />
                            <Redirect to={`/projects/${this.props.match.params.projectId}/tasks`} />
                        </Switch>
                    </div>
                </div>
            </LoaderHOC>
        );
    }
}

export default compose(
    withCurrentProject,
    withProjectDetails,
)(ProjectDetails);
