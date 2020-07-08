import React from 'react';
import Header from '../components/Header';
import StoriesList from '../components/StoriesList';

class StoriesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            filteredStories: []
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
                const promises = data.slice(0, 50).map((storyId) => {
                    return (
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
                            .then(res => res.json())
                    );
                });
                Promise.all(promises)
                    .then(stories => this.setState({ stories: stories, filteredStories: stories }))
            });
    }

    handleFilterChange(event) {
        const filter = event.target.value.toLowerCase();
        if (filter) {
            const filteredStories = this.state.stories.filter(story => story.title.toLowerCase().includes(filter));
            this.setState({ filteredStories: filteredStories });
        } else {
            this.setState({ filteredStories: this.state.stories });
        }
    }

    render() {
        return (
            <div className="stories-container">
                <Header onFilterChange={this.handleFilterChange} />
                <StoriesList stories={this.state.filteredStories} />
            </div>
        );
    }
}

export default StoriesContainer;