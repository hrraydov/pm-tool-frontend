import React from 'react';
import { connect } from 'react-redux';

const withCurrentProject = WrappedComponent => {
    class WithCurrentProject extends React.PureComponent {
        setCurrentProject = project => {
            this.props.dispatch({ type: 'SET_CURRENT_PROJECT', currentProject: project });
        };

        render() {
            return React.createElement(
                WrappedComponent,
                {
                    ...this.props,
                    currentProject: {
                        details: this.props.currentProject,
                        setCurrentProject: this.setCurrentProject,
                    },
                },
            );
        }
    }
    return connect(
        state => ({
            currentProject: state.application.currentProject,
        }),
    )(WithCurrentProject);
};

export default withCurrentProject;
