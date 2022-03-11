import React from 'react';
import PropTypes from 'prop-types';
import './TrackModal.css';

//=============================================================================================================================================================================================//

// Component that displays a modal with deeper information about a specific song.
export const TrackModal = ({ modal, onClose, track }) => {

    // If modal boolean is false, don't display the modal.
    if (!modal) {
        return null;
    };

    //=============================================================================================================================================================================================//

    return (
        <div className='modal' onClick={onClose}>
            {/* stopPropagation allows clicking off the edge of the modal to close modal. */}
            <div className='modal__content' onClick={e => e.stopPropagation()}>
                <div className='modal__header'>
                    <span className="close" onClick={onClose}>&times;</span>
                    <h4 className='modal__title'>{track.name}</h4>
                </div>
                <div className='modal__info-box'>
                    <div className='modal__image-box'>
                        <img src={track.albumImage} alt='Selected Songs Album Cover' className='modal__image'></img>
                    </div>
                    <div className='modal__info'>
                        <p>Artist: {track.artist}</p>
                        <p>Album: {track.album}</p>
                        <p>Album Release: {track.albumRelease}</p>
                    </div>
                </div>
                <div className='modal__preview'>
                    {track.preview ? <audio controls><source src={track.preview}/></audio> : 'No Preview Available'}
                </div>
            </div>
        </div>
    );
};

//=============================================================================================================================================================================================//

TrackModal.propTypes = {
    modal: PropTypes.bool,
    onClose: PropTypes.func,
    track: PropTypes.object
};