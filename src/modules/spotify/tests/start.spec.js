import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChain from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChain);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../../spotify/spotify';

describe('Spotify Wrapper', () => {
  describe('smoke tests', () => {
    it('should exists the search method', () => {
      expect(search).to.exist;
    });
    it('should exists the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });
    it('should exists the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });
    it('should exists the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
    it('should exists the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic search', () => {
    it('should call fetch function', () => {
      // criando um stub que busca dentro do objeto global o método fetch
      const fetchedStub = sinon.stub(global, 'fetch');
      const artits = search();

      expect(fetchedStub).to.have.been.calledOnce;

      fetchedStub.restore();
    });

    it('should receive the correct url to fetch', () => {
      const fetchedStub = sinon.stub(global, 'fetch');
      const artits = search('Incubus', 'artist');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const albums = search('Incubus', 'album');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
    });
  });
});
