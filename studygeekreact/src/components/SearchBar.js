import React, { useState } from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <form className="ui form">
            <div className="field">
            <label>Search by Subject</label>
            <input
            type='text'
            placeholder='search for subject'
            value={searchTerm}
            onChange={handleChange}
            />
            <small>We will match the best for you.</small>
            </div>
        </form>
    )

}

export default SearchBar;