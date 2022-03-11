import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

//=============================================================================================================================================================================================//

// Container that holds the list of songs returned from a search.
export const SearchResults = ({ searchResults, onAdd }) => {

    return (
        <div className='searchResults'>
            <div className='searchResults__header'>
                <h2>Search Results</h2>
            </div>
            <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false}/>
            <div className='searchResults__footer'>
                <h3>Select Song For More Information</h3>
            </div>
        </div>
    );
};

//=============================================================================================================================================================================================//

SearchResults.propTypes = {
    searchResults: PropTypes.array,
    onAdd: PropTypes.func,
};