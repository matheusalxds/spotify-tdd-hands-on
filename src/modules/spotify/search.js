import { API_URL } from '../../config/consts';

function searcher(type, query) {
  return this.request(`${this.apiURL}/search?q=${query}&type=${type}`)
}

export default function search() {
  return {
    artists: searcher.bind(this, 'artists'),
    albums: searcher.bind(this, 'album'),
    tracks: searcher.bind(this, 'tracks'),
    playlists: searcher.bind(this, 'playlist'),
  }
}

// export const search = (query, type) =>
//   fetch(`${API_URL}/search?q=${query}&type=${type}`)
//     .then(data => data.json());

// export const searchAlbums = (query) => search(query, 'album');

// Podemos fazer uma melhoria, já que sempre vamos utilizar a mesma url do "search", então podemos
// utilizar a própria função "search"
// export const searchArtists = () => fetch('https://api.spotify.com/v1/search?q=Incubus&type=artist');
// export const searchArtists = (query) => search(query, 'artist');

// export const searchTracks = (query) => search(query, 'tracks');

// export const searchPlaylists = (query) => search(query, 'playlist');
