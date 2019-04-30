import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChain from 'sinon-chai';

chai.use(sinonChain);

global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../../spotify/spotify';

describe('Spotify Wrapper', () => {
  // Transferido para fora do escopo de Generic search, já que todos os testes vão utilizar
  // Antes de cada teste é criado um stub
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    // É necessário adicionar, pois o stub não retorna
    // automaticamente uma promise, então essa linha é
    // adicionada para que o stub possa retornar uma
    // promise.
    fetchedStub.resolves({
      json: () => {
      },
    });
  });

  // Após cada teste é resetado/restaurado esse stub
  afterEach(() => {
    fetchedStub.restore();
  });
  // PS: Como o stub foi criado dentro do beforeEach, podemos
  // então eliminar os códigos que inicializam um stub
  // e restauram o mesmo

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
    // // Antes de cada teste é criado um stub
    // let fetchedStub;
    //
    // beforeEach(() => {
    //   fetchedStub = sinon.stub(global, 'fetch');
    //   // É necessário adicionar, pois o stub não retorna
    //   // automaticamente uma promise, então essa linha é
    //   // adicionada para que o stub possa retornar uma
    //   // promise.
    //   fetchedStub.resolves({
    //     json: () => {
    //     },
    //   });
    // });
    //
    // // Após cada teste é resetado/restaurado esse stub
    // afterEach(() => {
    //   fetchedStub.restore();
    // });
    // // PS: Como o stub foi criado dentro do beforeEach, podemos
    // // então eliminar os códigos que inicializam um stub
    // // e restauram o mesmo

    it('should call fetch function', () => {
      // criando um stub que busca dentro do objeto global o método fetch
      // const fetchedStub = sinon.stub(global, 'fetch');
      const artits = search();
      expect(fetchedStub).to.have.been.calledOnce;

      // Restore sinon stub
      // fetchedStub.restore();
    });

    it('should receive the correct url to fetch', () => {

      context('passing one type', () => {
        // const fetchedStub = sinon.stub(global, 'fetch');
        const artits = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

        // Restore sinon stub
        // fetchedStub.restore();
      });

      context('passing more than one type', () => {
        // const fetchedStub = sinon.stub(global, 'fetch');
        const artistsAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });

      it('should return the JSON Data from the Promise', () => {
        const artits = search('Incubus', 'artist');
        artits.then((data) => expect(data).to.be.eql({ album: 'name' }));
      });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artits = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const artits = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artits2 = searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=tracks');

      const tracks2 = searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=tracks');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlist = searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const playlist = searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      const playlist2 = searchPlaylists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });


});
