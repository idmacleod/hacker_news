import React from 'react';

const Story = ({ story }) => <li><a href={story.url}>{story.title}</a></li>;

export default Story;