import React, { useState } from "react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    return (
        <div className='search-bar'>
            <input
            type='text'
            placeholder='search for subject'
            value={searchTerm}
            onChange={handleChange}
            />
        </div>
    )

}

export default SearchBar;