import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PlaylistsList.css';
import { Spotify } from '../../Utilities/Spotify';
import { PlaylistsListItem } from '../PlaylistsListItem/PlaylistsListItem';

//=============================================================================================================================================================================================//

// Container that holds the list of user playlists. 
export const PlaylistsList = ({ onSelect, onDelete, onNameChange, flag }) => {
    
    const [playlists, setPlaylists] = useState([]);

    //=============================================================================================================================================================================================//

    // Gets the users playlists for displaying in the list everytime flag variable is changed, which is everytime the save button is clicked.
    useEffect(() => {
        
        const getPlaylist = async () => {
            const playlistArray = await Spotify.getUserPlaylists();
            setPlaylists(playlistArray);
        };

        getPlaylist();

    }, [flag]);

    //=============================================================================================================================================================================================//

    return (
        <div className='playlistsList'>
            {/* Maps every playlist in the playlist array and creates a new PlaylistListItem component for every playlist with passed in info. */}
            {playlists.map((playlist) => {
                return (
                    <PlaylistsListItem key={playlist.id} playlist={playlist} onSelect={onSelect} onDelete={onDelete} onNameChange={onNameChange}/>
                )
            })}
        </div>
    );
};

//=============================================================================================================================================================================================//

PlaylistsList.propTypes = {
    onSelect: PropTypes.func,
    onNameChange: PropTypes.func,
    flag: PropTypes.bool
};