import React from 'react';
import { compose } from 'redux';
import withLoadProjects from 'hoc/with-load-projects';
import withCurrentProject from 'hoc/with-current-project';
import Async from 'react-select';
import { withRouter } from 'react-router-dom';
import { selectStyles } from 'helpers/constants';

class ProjectSelector extends React.PureComponent {
    componentDidMount() {
        this.props.loadProjects();
    }

    handleChange = selected => {
        this.props.history.push(`/projects/${selected.value}`);
    };

    selectedOption = () => (this.props.currentProject.details ? ({ value: this.props.currentProject.details.id, label: this.props.currentProject.details.name }) : null);

    render() {
        return (
            <Async
                defaultOptions
                styles={selectStyles}
                value={this.selectedOption()}
                onChange={this.handleChange}
                options={this.props.projects.map(project => ({
                    value: project.id,
                    label: project.name,
                }))}
            />
        );
    }
}

export default compose(
    withRouter,
    withLoadProjects,
    withCurrentProject,
)(ProjectSelector);
