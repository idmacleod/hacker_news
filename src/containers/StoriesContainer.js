import React from 'react';
import Header from '../components/Header';
import StoriesList from '../components/StoriesList';

class StoriesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stories: [],
            filteredStories: [],
            currentPage: 1
        }
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        this.fetchStories(0);
    }

    fetchStories(index) {
        const urlId = 'https://hacker-news.firebaseio.com/v0/topstories.json'
        fetch(urlId)
            .then(res => res.json())
            .then(data => {
                const promises = data.slice(index, index + 25).map((storyId) => {
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

    handlePageChange(page) {
        const index = (page * 25) - 25;
        this.setState({ currentPage: page });
        this.fetchStories(index);
    }

    render() {
        return (
            <div className="stories-container">
                <Header onFilterChange={this.handleFilterChange} currentPage={this.state.currentPage} onPageChange={this.handlePageChange} />
                <StoriesList stories={this.state.filteredStories} />
                <p>© Team Awesome {new Date().getFullYear()}</p>
            </div>
        );
    }
}

export default StoriesContainer;