import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { calledOnce, exists, calledWith, deepEqually } from '../../../util/expects';
import { getAlbum, getAlbums, getAlbumTracks } from '../albums';

chai.use(sinonChai);
global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    stubedFetch.resolves(data => data);
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      exists(getAlbum);
    });

    it('should have getAlbums method', () => {
      exists(getAlbums);
    });

    it('should have getAlbumTracks method', () => {
      exists(getAlbumTracks);
    });
  });

  // getAlbum method
  describe('getAlbum', () => {
    //  Verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbum();
      calledOnce(stubedFetch);
    });

    //  Verifica se o fetch ocorre com a url desejada
    it('should call fetch with the correct url', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      calledWith(stubedFetch, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      calledWith(stubedFetch, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    //  Verifica se o dado é recebido pela promise
    it('should return the corrent data from Promise', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      album.then(data => {
        deepEqually(data, { album: 'name' });
      });
    });
  });

  // getAlbums method
  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums(['albumA', 'albumB']);
      calledOnce(stubedFetch);
    });

    it('should call fetch with the correct url', () => {
      const album = getAlbums(['albumA', 'albumB']);
      calledWith(stubedFetch, `https://api.spotify.com/v1/albums/?ids=albumA,albumB`);
    });

    it('should return the correct data from Promise', () => {
      const album = getAlbums(['albumA', 'albumB']);
      album.then(data => {
        deepEqually(data, { albums: ['albumA', 'albumB'] });
      });
    });
  });

  // getAlbumTracks
  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const albumTracks = getAlbumTracks();
      calledOnce(stubedFetch);
    });

    it('should call fetch with the correct url', () => {
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      calledWith(stubedFetch, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');

      const tracks2 = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTk');
      calledWith(stubedFetch, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk/tracks');
    });

    it('should return the correct data from Promise', () => {
      const albumTracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      albumTracks.then(data => {
        deepEqually(data, { track: ['tracks', 'tracks2'] });
      })
    })
  });
});
