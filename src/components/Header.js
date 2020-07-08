import React from 'react';

const Header = (props) => {
    const handleChange = event => {
        props.onFilterChange(event);
    }

    const handleNext = event => {
        props.onPageChange(props.currentPage + 1);
    }

    const handlePrev = event => {
        if (props.currentPage !== 1) {
            props.onPageChange(props.currentPage - 1);
        }
    }

    return (
        <header>
            <h1>Hacker News</h1>
            <button onClick={handlePrev}>Prev 10</button>
            <input type="text" name="filter" id="filter" onChange={handleChange} />
            <button onClick={handleNext}>Next 10</button>
        </header>
    );
}

export default Header;