import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

//=============================================================================================================================================================================================//

// Component that contains the search field for searching the api for a song, album, or artist.
export const SearchBar = ({ onSearch }) => {

    const [term, setTerm] = useState('');

    const search = () => {
        onSearch(term);
    };

    const handleTermChange = ({ target }) => {
        setTerm(target.value);
    };

    const submit = (event) => {
        if(event.key === 'Enter') {
            search();
        }
    };

    //=============================================================================================================================================================================================//

    // Listens for an event of hitting the enter key, to submit the search instead of clicking the button.
    useEffect(() => {
        document.addEventListener('keydown', submit);

        return () => {
            document.removeEventListener('keydown', submit);
        };
    });

    //=============================================================================================================================================================================================//

    return (
        <div className='searchbar'>
            <input placeholder='Enter a Song, Album, or Artist' onChange={handleTermChange}/>
            <button className='search__btn' onClick={search}>SEARCH</button>
        </div>
    );
};

//=============================================================================================================================================================================================//

SearchBar.propTypes = {
    onSearch: PropTypes.func
};