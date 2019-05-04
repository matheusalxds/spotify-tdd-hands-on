export const getAlbum = (id) =>
  fetch(`https://api.spotify.com/v1/albums/${id}`)
    .then(data => ({ album: 'name' }));

export const getAlbumTracks = () => {
};
