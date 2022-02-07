import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
        };
    }

    handleInput = (e) => {
        this.setState({ searchTerm: e.target.value }, () => {});
    };

    handleSubmit = () => {
        this.props.searchIpAddress(this.state.searchTerm);
    };

    render() {
        return (
            <div className="search">
                <input
                    type="text"
                    className="searchTerm"
                    placeholder="Search for any IP address or domain"
                    onChange={this.handleInput}
                    value={this.state.searchTerm ?? null}
                />
                <button
                    onClick={this.handleSubmit}
                    type="submit"
                    className="searchButton"
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        );
    }
}

export default SearchBar;
