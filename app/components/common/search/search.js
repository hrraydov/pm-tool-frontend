import React from 'react';
import { Input, Icon } from 'components/common/index';

import './search.css';

class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentDidMount() {
        this.onChange(this.props.query);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) {
            this.onChange(this.props.query);
        }
    }

    onChange(value) {
        this.setState({
            query: value,
        });
    }

    onSearch() {
        this.props.onSearch(this.state.query);
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSearch();
        }
    }

    render() {
        return (
            <div className="search-wrapper">
                <Input
                    value={this.state.query}
                    type="text"
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChange}
                    rightItem={<Icon name="faSearch" onClick={this.onSearch} />}
                />
            </div>
        );
    }
}

export default Search;
