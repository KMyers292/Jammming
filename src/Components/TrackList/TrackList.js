import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import { Track } from '../Track/Track';

//=============================================================================================================================================================================================//

// Container that holds the list of songs for both search results and current playlist.
export const TrackList = ({ tracks, onAdd, onRemove, isRemoval }) => {

    return (
        <div className='tracklist'>
            {/* Maps every song in the track array and creates a new Track component for every song with passed in info. */}
            {tracks.map((track) => {
                return (
                    <Track key={track.id} track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval}/>
                );
            })}
        </div>
    );
};

//=============================================================================================================================================================================================//

TrackList.propTypes = {
    tracks: PropTypes.array,
    onRemove: PropTypes.func,
    onAdd: PropTypes.func,
    isRemoval: PropTypes.bool
};