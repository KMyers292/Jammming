import React from 'react';
import PropTypes from 'prop-types';
import './PlaylistResults.css';
import { TrackList } from '../TrackList/TrackList';

//=============================================================================================================================================================================================//

// Container that holds a list of songs for a specific playlist as well as a playlist name.
export const PlaylistResults = ({ playlistName, playlistTracks, onRemove, onSave }) => {

    return (
        <div className='playlistResults'>
            <div className='playlistResults__header'>
                <h2>{playlistName}</h2>
                <button className='playlist__save' onClick={onSave}>Save Playlist</button>
            </div>
            <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true}/>
        </div>
    );
};

//=============================================================================================================================================================================================//

PlaylistResults.propTypes = {
    playlistName: PropTypes.string,
    playlistTracks: PropTypes.array,
    onRemove: PropTypes.func,
    onSave: PropTypes.func
};