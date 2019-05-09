import { search, searchPlaylists, searchTracks, searchAlbums, searchArtists } from './search';

import { getAlbums, getAlbumTracks, getAlbum } from './albums';

// module.exports = {
//   search, searchPlaylists, searchTracks, searchAlbums, searchArtists,
//   getAlbums, getAlbumTracks, getAlbum,
// };

import { API_URL } from '../../config/consts';

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
  }
}
