import React from 'react';
import Header from '../components/Header';
import StoriesList from '../components/StoriesList';

class StoriesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            filter: ''
        }
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentDidMount() {
        this.fetchStories();
    }

    fetchStories() {
        const urlId = 'https://hacker-news.firebaseio.com/v0/topstories.json'
        fetch(urlId)
            .then(res => res.json())
            .then(data => {
                const promises = data.slice(0 ,50).map((storyId) => {
                    return (
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
                            .then(res => res.json())
                    );
                });
                Promise.all(promises)
                    .then(stories => this.setState({stories: stories}))
            });
    }

    handleFilterChange(title) {
        this.setState({filter: title});
    }

    render() {
        return (
            <div className="stories-container">
                <Header onFilterChange={this.handleFilterChange} />
                <StoriesList stories={this.state.stories} />
            </div>
        );
    }
}

export default StoriesContainer;