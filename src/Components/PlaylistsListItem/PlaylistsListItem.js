import React from 'react';
import PropTypes from 'prop-types';
import './PlaylistsListItem.css';

//=============================================================================================================================================================================================//

// Component that displays information about a specific playlist in a list.
export const PlaylistsListItem = ({ playlist, onSelect, onDelete, onNameChange }) => {

    const selectPlaylist = () => {
        onSelect(playlist.id);
        onNameChange(playlist.name);
    };

    const deletePlaylist = () => {
        onDelete(playlist.id);
    }

    //=============================================================================================================================================================================================//

    return (
        <div className='playlistsItem'>
            <div className='playlistsItem__info' onClick={selectPlaylist}>
                <h3>{playlist.name}</h3>
            </div>
            <button className='playlist__delete' onClick={deletePlaylist}>-</button>
        </div>
    );
};

//=============================================================================================================================================================================================//

PlaylistsListItem.propTypes = {
    playlist: PropTypes.object,
    onSelect: PropTypes.func,
    onNameChange: PropTypes.func
};