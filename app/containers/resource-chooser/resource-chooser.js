import React from 'react';
import { compose } from 'redux';
import withLoadResource from 'hoc/with-load-resources';
import LoaderHOC from 'hoc/loader';
import { List } from 'components';
import { withRouter } from 'react-router';

class ResourceChooser extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.load();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.load();
        }
    }

    load = () => {
        this.props.loadResources.load(this.props.match.params.projectId);
    };

    render() {
        return (
            <div className="resource-chooser">
                <LoaderHOC isLoading={this.props.loadResources.isLoading}>
                    <List
                        items={this.props.loadResources.resources}
                        renderItem={resource => (
                            <div className="resource-item" key={resource.id}>
                                <span>{resource.name}</span>
                                <button type="button" className="button button-primary" onClick={() => { this.props.onChoose(resource.id); }}>Link</button>
                            </div>
                        )}
                    />
                </LoaderHOC>
            </div>
        );
    }
}

export default compose(
    withRouter,
    withLoadResource,
)(ResourceChooser);
