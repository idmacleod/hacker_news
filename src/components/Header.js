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
            <h1 className="header-text">Hacker News</h1>
            <nav>
                {(props.currentPage === 1) && <button disabled onClick={handlePrev}>Prev 25</button>}
                {(props.currentPage !== 1) && <button onClick={handlePrev}>Prev 25</button>}
                <input type="text" name="filter" id="filter" onChange={handleChange} placeholder="Filter stories..." />
                <button onClick={handleNext}>Next 25</button>
            </nav>
        </header>
    );
}

export default Header;