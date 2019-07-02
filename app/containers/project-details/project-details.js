import React from 'react';
import { compose } from 'redux';
import {
    Sidebar, Tasks, Resources, TaskDetails, TaskEdit, Budgets,
} from 'containers';
import { Redirect, Route, Switch } from 'react-router-dom';
import withProjectDetails from 'hoc/with-project-details';
import withCurrentProject from 'hoc/with-current-project';
import LoaderHOC from 'hoc/loader';

import './project-details.css';

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
                            <Route exact path="/projects/:projectId/budgets" component={Budgets} />
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
