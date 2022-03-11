import React, { useState } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { Playlists } from '../Playlists/Playlists';
import { SearchResults } from '../SearchResults/SearchResults';
import { PlaylistResults } from '../PlaylistResults/PlaylistResults';
import { Spotify } from '../../Utilities/Spotify';

//=============================================================================================================================================================================================//

const App = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);
  const [playlistFlag, setPlaylistFlag] = useState(true);

  //=============================================================================================================================================================================================//

  // Adds the passed in track to the playlistTracks state variable array.
  const addTrack = (track) => {

    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    else {
      setPlaylistTracks((prevPlaylistTracks) => [...prevPlaylistTracks, track]);
    };
  };

  //=============================================================================================================================================================================================//

  // Removes passed in track from the playlistTracks state variable array.
  const removeTrack = (track) => {

    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      let playlistArray = [...playlistTracks];
      let index = playlistArray.indexOf(track);

      if (index !== -1) {
        playlistArray.splice(index, 1);
        setPlaylistTracks(playlistArray);
      }
    }
    else {
      return;
    };
  };

  //=============================================================================================================================================================================================//

  // Updates the playlistName state variable to the current playlist name entered.
  const updatePlaylistName = (name) => {

    setPlaylistName(name);
  };

  //=============================================================================================================================================================================================//

  // Saves the tracks in the playlistTracks array to the users current playlist. If user has removed songs, it will delete those songs as well.
  const savePlaylist = async () => {

    let trackUris = playlistTracks.map((track) => track.uri);

    const currentPlaylist = await Spotify.getPlaylist(playlistId);
    const playlistUris = currentPlaylist.map((track) => track.uri);

    if (trackUris.length < playlistUris.length) {
      const newTrackUris = playlistUris.filter((track) => !trackUris.includes(track));

      await Spotify.deleteTrack(newTrackUris, playlistId);
    };

    const contains = trackUris.filter((track) => playlistUris.includes(track));

    trackUris = trackUris.filter((track) => !contains.includes(track));

    if (trackUris) {
      await Spotify.savePlaylist(playlistName, trackUris, playlistId);
    };
  };

  //=============================================================================================================================================================================================//

  // Creates a new playlist on the users account based on the title entered.
  const createPlaylist = async (name) => {
    await Spotify.createPlaylist(name);
    playlistFlag === true ? setPlaylistFlag(false) : setPlaylistFlag(true);
  };

  //=============================================================================================================================================================================================//

  // 'Unfollows' selected playlist from the users account based on the playlist id.
  const deletePlaylist = async (id) => {
    await Spotify.deletePlaylist(id);
    playlistFlag === true ? setPlaylistFlag(false) : setPlaylistFlag(true);
  }

  //=============================================================================================================================================================================================//

  // Sets the current active playlist to the selected one passed in.
  const selectPlaylist = async (id) => {

    const playlistTracks = await Spotify.getPlaylist(id);

    setPlaylistId(id);
    setPlaylistTracks(playlistTracks);
  };

  //=============================================================================================================================================================================================//

  // Uses an API call to search through the api to find songs based on the term passed in.
  const search = async (term) => {

    const results = await Spotify.search(term);

    setSearchResults(results);
  };

  //=============================================================================================================================================================================================//

  return (
    <div className='App'>
      <h1 className='main__header'>Ja<span className='header__highlight'>mmm</span>ing</h1>
      <SearchBar onSearch={search}/>
      <div className='app__grid'>
        <Playlists onCreate={createPlaylist} onDelete={deletePlaylist} onNameChange={updatePlaylistName} onSelect={selectPlaylist} flag={playlistFlag}/>
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <PlaylistResults playlistName={playlistName} playlistTracks={playlistTracks} onRemove={removeTrack} onSave={savePlaylist} />
      </div>
    </div>
  );
}

export default App;