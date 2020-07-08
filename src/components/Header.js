import React from 'react';

const Header = (props) => {
    const handleChange = event => {
        props.onFilterChange(event);
    }

    return (
        <header>
            <h1>Hacker News</h1>
            <input type="text" name="filter" id="filter" onChange={handleChange} />
        </header>
    );
}

export default Header;