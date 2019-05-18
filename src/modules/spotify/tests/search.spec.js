import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChain from 'sinon-chai';

chai.use(sinonChain);

global.fetch = require('node-fetch');

// import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../search';

import SpotifyWrapper from '../index';

describe('Search', () => {
  let spotify;
  // Transferido para fora do escopo de Generic search, já que todos os testes vão utilizar
  // Antes de cada teste é criado um stub
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });
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
    // Não é mais necessário pelo fato de após ter refatorado
    // não existir mais esse método
    // it('should exists the search method', () => {
    //   expect(search).to.exist;
    // });
    it('should exists the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist;
    });
    it('should exists the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });
    it('should exists the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });
    it('should exists the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  //   // Removido pois após refatorar, esse método não existe mais
  // describe('Generic search', () => {
  //   // // Antes de cada teste é criado um stub
  //   // let fetchedStub;
  //   //
  //   // beforeEach(() => {
  //   //   fetchedStub = sinon.stub(global, 'fetch');
  //   //   // É necessário adicionar, pois o stub não retorna
  //   //   // automaticamente uma promise, então essa linha é
  //   //   // adicionada para que o stub possa retornar uma
  //   //   // promise.
  //   //   fetchedStub.resolves({
  //   //     json: () => {
  //   //     },
  //   //   });
  //   // });
  //   //
  //   // // Após cada teste é resetado/restaurado esse stub
  //   // afterEach(() => {
  //   //   fetchedStub.restore();
  //   // });
  //   // // PS: Como o stub foi criado dentro do beforeEach, podemos
  //   // // então eliminar os códigos que inicializam um stub
  //   // // e restauram o mesmo
  //
  //   // Removido pois após refatorar, esse método não existe mais
  //   // it('should call fetch function', () => {
  //   //   // criando um stub que busca dentro do objeto global o método fetch
  //   //   // const fetchedStub = sinon.stub(global, 'fetch');
  //   //   const artits = search();
  //   //   expect(fetchedStub).to.have.been.calledOnce;
  //   //
  //   //   // Restore sinon stub
  //   //   // fetchedStub.restore();
  //   // });
  //
  //   it('should receive the correct url to fetch', () => {
  //     context('passing one type', () => {
  //       // const fetchedStub = sinon.stub(global, 'fetch');
  //       const artits = search('Incubus', 'artist');
  //       expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');
  //
  //       const albums = search('Incubus', 'album');
  //       expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
  //
  //       // Restore sinon stub
  //       // fetchedStub.restore();
  //     });
  //
  //     context('passing more than one type', () => {
  //       // const fetchedStub = sinon.stub(global, 'fetch');
  //       const artistsAlbums = search('Incubus', ['artist', 'album']);
  //       expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
  //     });
  //
  //     it('should return the JSON Data from the Promise', () => {
  //       const artits = search('Incubus', 'artist');
  //       artits.then((data) => expect(data).to.be.eql({ album: 'name' }));
  //     });
  //   });
  // });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artits = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const artits = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artists');

      const artits2 = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artists');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const albums = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      const albums2 = spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const tracks = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=tracks');

      const tracks2 = spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=tracks');
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      const playlist = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const playlist = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      const playlist2 = spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });
});
