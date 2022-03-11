import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Playlists.css';
import { PlaylistsList } from '../PlaylistsList/PlaylistsList';

//=============================================================================================================================================================================================//

// Container to hold the list of playlists in the users account, and gives the ability to add/unfollow playlists.
export const Playlists = ({ onCreate, onDelete, onSelect, onNameChange, flag }) => {

    const [newPlaylist, setNewPlaylist] = useState('');

    //=============================================================================================================================================================================================//

    const handleCreate = () => {
        onCreate(newPlaylist);
        setNewPlaylist('');
    }

    const handlePlaylistChange = ({ target }) => {
        setNewPlaylist(target.value);
    }

    const submit = (event) => {
        if (event.key === 'Enter') {
            handleCreate();
        };
    };

    //=============================================================================================================================================================================================//

    // Listens for an event of hitting the enter key, to submit the handleCreate instead of clicking the button.
    useEffect(() => {
        document.addEventListener('keydown', submit);

        return () => {
            document.removeEventListener('keydown', submit);
        };
    });

    //=============================================================================================================================================================================================//

    return (
        <div className='playlists'>
            <div className='playlists__title'>
                <h2>Playlists</h2>
            </div>
            <div className='playlists__input'>
                <input placeholder='Create New Playlist Name' onChange={handlePlaylistChange}/>
                <button className='playlists__add' onClick={handleCreate}>+</button>
            </div>
            <PlaylistsList onSelect={onSelect} onDelete={onDelete} onNameChange={onNameChange} flag={flag}/>
        </div>
    );
};

//=============================================================================================================================================================================================//

Playlists.propTypes = {
    onCreate: PropTypes.func,
    onDelete: PropTypes.func,
    onSelect: PropTypes.func,
    onNameChange: PropTypes.func,
    flag: PropTypes.bool 
}