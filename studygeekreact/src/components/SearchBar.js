import React from "react";

const SearchBar = (props) => {
    const handleChange = (e) => {
        props.searchValue(e.target.value);
    };
    return (
        <form method='POST' name='formName'>
            <label>
                Search Subject:
                <input type='text' name='searchTerm' onChange={handleChange} />
            </label>
        </form>
    )

}

export default SearchBar;