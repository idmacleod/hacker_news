import React from 'react';
import Story from './Story';

const StoriesList = (props) => {
    const storyNodes = props.stories.map((story, index) => {
        return <Story key={index} story={story} />
    })

    return (
        <ul>
            {storyNodes}
        </ul>
    );
}

export default StoriesList;