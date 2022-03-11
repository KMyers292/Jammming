import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Track.css';
import { TrackModal } from '../../Components/TrackModal/TrackModal';

//=============================================================================================================================================================================================//

// Component that displays information about a specific song in a list.
export const Track = ({ track, onAdd, onRemove, isRemoval }) => {

    // Used to keep track of the state of the modal, whether it's open or not.
    const [modal, setModal] = useState(false);

    // Functions used to add or remove tracks based on if they are in the search results or playlist.
    const addTrack = () => onAdd(track);
    const removeTrack = () => onRemove(track);

    // Functions used to open or close the modal to display more info about a specific song.
    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    // Function determines which button to display based on the status of 'isRemoval'.
    const renderAction = () => {
        if (isRemoval) {
            return <button className='track__action' onClick={removeTrack}>-</button>
        }
        else {
            return <button className='track__action' onClick={addTrack}>+</button>
        }
    };

    //=============================================================================================================================================================================================//

    return (
        <div className='track'>
            <div className='track__info' onClick={openModal}>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            {renderAction()}
            <TrackModal modal={modal} onClose={closeModal} track={track}/>
        </div>
    );
};

//=============================================================================================================================================================================================//

Track.propTypes = {
    track: PropTypes.object,
    onRemove: PropTypes.func,
    onAdd: PropTypes.func,
    isRemoval: PropTypes.bool
};