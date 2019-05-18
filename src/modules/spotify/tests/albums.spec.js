import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { calledOnce, exists, calledWith, deepEqually } from '../../../util/expects';

// Agora utilizar o SpotifyWrapper
// import { getAlbum, getAlbums, getAlbumTracks } from '../albums';
import SpotifyWrapper from '../index';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', () => {
  let spotify;
  let stubedFetch;
  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
    stubedFetch = sinon.stub(global, 'fetch');
    stubedFetch.resolves(data => data);
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      exists(spotify.album.getAlbum);
      // exists(getAlbum);
    });

    it('should have getAlbums method', () => {
      exists(spotify.album.getAlbums);
    });

    it('should have getAlbumTracks method', () => {
      exists(spotify.album.getTracks);
    });
  });

  // getAlbum method
  describe('getAlbum', () => {
    //  Verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      calledOnce(stubedFetch);
    });

    //  Verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct url', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      calledWith(stubedFetch, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      calledWith(stubedFetch, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    //  Verifica se o dado é recebido pela promise
    it('should return the corrent data from Promise', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      album.then(data => {
        deepEqually(data, { album: 'name' });
      });
    });
  });

  // getAlbums method
  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = spotify.album.getAlbums(['albumA', 'albumB']);
      calledOnce(stubedFetch);
    });

    it('should call fetch with the correct url', () => {
      const album = spotify.album.getAlbums(['albumA', 'albumB']);
      calledWith(stubedFetch, `https://api.spotify.com/v1/albums/?ids=albumA,albumB`);
    });

    it('should return the correct data from Promise', () => {
      const album = spotify.album.getAlbums(['albumA', 'albumB']);
      album.then(data => {
        deepEqually(data, { albums: ['albumA', 'albumB'] });
      });
    });
  });

  // getAlbumTracks
  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const albumTracks = spotify.album.getTracks();
      calledOnce(stubedFetch);
    });

    it('should call fetch with the correct url', () => {
      const tracks = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      calledWith(stubedFetch, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');

      const tracks2 = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTk');
      calledWith(stubedFetch, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk/tracks');
    });

    it('should return the correct data from Promise', () => {
      const albumTracks = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      albumTracks.then(data => {
        deepEqually(data, { track: ['tracks', 'tracks2'] });
      })
    })
  });
});
