import { API_URL } from '../../config/consts';

export const getAlbum = (id) =>
  fetch(`${API_URL}/albums/${id}`)
    .then(data => ({ album: 'name' }));

export const getAlbums = (ids) =>
  fetch(`${API_URL}/albums/?ids=${ids}`)
    .then(data => ({ albums: ['albumA', 'albumB'] }));

export const getAlbumTracks = (id) =>
  fetch(`${API_URL}/albums/${id}/tracks`)
    .then(data => ({ track: ['tracks', 'tracks2'] }));
