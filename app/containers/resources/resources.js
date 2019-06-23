import React from 'react';
import { compose } from 'redux';
import LoaderHOC from 'hoc/loader';
import {
    Icon, Input, List, Modal,
} from 'components';
import withCurrentProject from 'hoc/with-current-project';
import withSaveResource from 'hoc/with-save-resource';
import withLoadResource from 'hoc/with-load-resources';

import './resources.css';

class Resources extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            name: '',
            description: '',
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
        if (prevProps.saveResource.isLoading !== this.props.saveResource.isLoading && this.props.saveResource.error === null) {
            this.setState({
                modal: false,
                name: '',
                description: '',
                id: null,
            });
            this.load();
        }
    }

    load = () => {
        this.props.loadResources.load(this.props.match.params.projectId);
    };

    handleSave = e => {
        e.preventDefault();
        e.stopPropagation();

        this.props.saveResource.save(this.props.currentProject.details.id, {
            name: this.state.name,
            description: this.state.description,
            id: this.state.id,
        });
    };

    renderModal = () => (
        <Modal onClose={() => {
            this.setState({ modal: false });
        }}
        >
            <LoaderHOC isLoading={this.props.saveResource.isLoading} loadingTextKey="Saving resource">
                {this.props.saveResource.error
                && <div className="danger">{this.props.saveResource.error}</div>}
                <h1 className="text-center">{this.state.id ? 'Edit resource' : 'Create new resource'}</h1>
                <form className="resource-form" onSubmit={this.handleSave}>
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
        return (
            <LoaderHOC isLoading={this.props.loadResources.isLoading} loadingTextKey="Loading resources">
                {this.props.loadResources.error && (
                    <Modal onClose={() => {
                        this.props.loadResources.clearError();
                    }}
                    >
                        <div className="danger">{this.props.loadResources.error}</div>
                    </Modal>
                )}
                {this.state.modal && this.renderModal()}
                <div className="resources-container">
                    <h1>Resources</h1>
                    <button
                        type="button"
                        className="button button-primary"
                        onClick={() => {
                            this.setState({ modal: true });
                        }}
                    >
                        <span>Create new resource</span>
                    </button>
                    <List
                        items={this.props.loadResources.resources.map(resource => ({ key: resource.id, data: resource }))}
                        renderItem={item => (
                            <div className="resource-item">
                                <div className="details">
                                    <h3>{item.data.name}</h3>
                                    <div>{item.data.description}</div>
                                </div>
                                <div className="actions">
                                    <button
                                        type="button"
                                        className="button button-primary button-round button-icon"
                                        onClick={() => {
                                            this.setState({
                                                modal: true,
                                                id: item.data.id,
                                                name: item.data.name,
                                                description: item.data.description,
                                            });
                                        }}
                                    >
                                        <Icon name="faEdit" />
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </LoaderHOC>
        );
    }
}

export default compose(
    withCurrentProject,
    withSaveResource,
    withLoadResource,
)(Resources);
