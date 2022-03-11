let accessToken;
let userId;
const clientId = '2decb6bc9b754a439592f764599f682f';
const redirectUri = 'http://localhost:3000/';

//=============================================================================================================================================================================================//

export const Spotify = {

    // Gets the Spotify API access token to be able to use the API.
    getAccessToken() {

        // Return accessToken if user has already logged in and set the token.
        if (accessToken) {
            return accessToken;
        }

        // Captures the regex matches for the browsers url to get the access token and expiry.
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            // Index 0 of the match contains the entire string (Url and result), Index 1 contains just the result.
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // Starts a timer to remove access from the browser at the specified expiry + 1 second.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            // Adds the removed access to browsers history.
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        }
        else {
            // If no matches, send the browsers to Spotify's url to login to their Spotify account.
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },


    //=============================================================================================================================================================================================//

    // Creates the header needed to make search requests based on the users access token. Returns a header object for GET AND POST requests.
    getHeader() {

        // Only fetch access token if not already present to cut down on API calls.
        if (!accessToken) {
            accessToken = this.getAccessToken();
        }

        const header = {Authorization: `Bearer ${accessToken}`};

        return header;
    },

    //=============================================================================================================================================================================================//

    // Gets the users id from the Spotify API needed to access/modify users playlists and songs.
    async getUserId() {

        // Only fetch users id if not already present to cut down on API calls.
        if (!userId) {
            // Fetches the id of the current user logged in.
            try {
                const header = this.getHeader();

                const response = await fetch('https://api.spotify.com/v1/me', {headers: header});
                const jsonResponse = await response.json();

                userId = jsonResponse.id;
            } 
            catch (error) {
                console.log(`getUserId error: ${error}`);
            }
        }

        return userId;
    },

    //=============================================================================================================================================================================================//

    // Gets the current users existing playlists. Returns array of playlist objects with name and id of each. 
    async getUserPlaylists() {

        try {
            const header = this.getHeader();

            // Only fetch users id if not already present to cut down on API calls.
            if (!userId) {
                userId = await this.getUserId();
            }

            // Fetches an array of the users playlists using the users id and header with users access token.
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header
            });
    
            const jsonResponse = await response.json();

            // If the fetch call returns no data, return an empty array.
            if (!jsonResponse.items) {
                return [];
            }
            else {
                // If results were found, map the results and return new objects based on the specified results data.
                return jsonResponse.items.map((playlist) => ({
                    id: playlist.id,
                    name: playlist.name
                }));
            }
        } 
        catch (error) {
            console.log(`getUserPlaylists error: ${error}`);
        }
    },

    //=============================================================================================================================================================================================//

    // Gets the tracks from a specified playlist based on id passed in. Returns array of objects with specified track information.
    async getPlaylist(id) {

        try {
            const header = this.getHeader();

            // Only fetch users id if not already present to cut down on API calls.
            if (!userId) {
                userId = await this.getUserId();
            }

            // Fetches an array of tracks from a specific playlist using users id, playlist id, and users access token in the header.
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`, {
                headers: header
            });
    
            const jsonResponse = await response.json();
    
            // If the fetch call returns no data, return an empty array.
            if (!jsonResponse.items) {
                return [];
            }
            else {
                // If results were found, map the results and return new objects based on the specified results data.
                return jsonResponse.items.map((item) => ({
                    id: item.track.id,
                    name: item.track.name,
                    artist: item.track.artists[0].name,
                    album: item.track.album.name,
                    albumImage: item.track.album.images[2].url,
                    albumRelease: item.track.album.release_date,
                    preview: item.track.preview_url,
                    uri: item.track.uri
                }));
            }
        } 
        catch (error) {
            console.log(`getPlaylist error: ${error}`);
        }
    },

    //=============================================================================================================================================================================================//

    // Uses the API to fetch search results based on passed in argument.
    async search(term) {

        try {
            const header = this.getHeader();

            // Fetches an array of tracks filtered by the term passed in and using the users access token in the header.
            const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: header});
            const jsonResponse = await response.json();
            
            // If the fetch call returns no data, return an empty array.
            if (!jsonResponse.tracks) {
                return [];
            }
            else {
                // If results were found, map the results and return new objects based on the specified results data.
                return jsonResponse.tracks.items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    albumImage: track.album.images[2].url,
                    albumRelease: track.album.release_date,
                    preview: track.preview_url,
                    uri: track.uri,
                }));
            }
        } 
        catch (error) {
            console.log(`search error: ${error}`);
        }
    },

    //=============================================================================================================================================================================================//

    // Creates a new playlist to the users Spotify account.
    async createPlaylist(name) {
        if(!name) {
            return;
        }

        try {
            const header = this.getHeader();

            await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header,
                method: 'POST',
                body: JSON.stringify({name: name}) 
            });
            
        } catch (error) {
            console.log(`createPlaylist error: ${error}`);
        }
    },

    //=============================================================================================================================================================================================//

    // 'Unfollows' a playlist from the users Spotify account.
    async deletePlaylist(id) {
        if(!id) {
            return;
        }

        try {
            const header = this.getHeader();

            await fetch(`https://api.spotify.com/v1/playlists/${id}/followers`, {
                headers: header,
                method: 'DELETE',
            });
        } catch (error) {
            console.log(`deletePlaylist error: ${error}`);
        }
    },

    //=============================================================================================================================================================================================//

    // Saves the current playlist to the users Spotify account.
    async savePlaylist(name, trackUris, playlistId) {

        // If no playlist name or tracks are passed in, then do nothing.
        if (!name || !trackUris.length || !playlistId) {
            return;
        }

        try {
            const header = this.getHeader();

            // Only fetch users id if not already present to cut down on API calls.
            if (!userId) {
                userId = await this.getUserId();
            }
    
            // Adds specified tracks to the playlist requested using users id and playlist id.
            return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: header,
                method: 'POST',
                body: JSON.stringify({uris: trackUris})
            });           
        } 
        catch (error) {
            console.log(`savePlaylist error: ${error}`);    
        }
    },

    //=============================================================================================================================================================================================//

    // Deletes specified tracks from the selected playlist.
    async deleteTrack(trackUris, playlistId) {

        try {
            const header = this.getHeader();

            // Only fetch users id if not already present to cut down on API calls.
            if (!userId) {
                userId = await this.getUserId();
            }

            // Deletes specified tracks to the playlist requested using users id and playlist id.
            return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: header,
                method: 'DELETE',
                body: JSON.stringify({uris: trackUris})
            });
        } 
        catch (error) {
            console.log(`deleteTrack error: ${error}`);
        }
    }
};