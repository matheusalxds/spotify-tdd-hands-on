// import { search, searchPlaylists, searchTracks, searchAlbums, searchArtists } from './search';
// import { getAlbums, getAlbumTracks, getAlbum } from './albums';

// module.exports = {
//   search, searchPlaylists, searchTracks, searchAlbums, searchArtists,
//   getAlbums, getAlbumTracks, getAlbum,
// };

// Após refatorar, não chamamos mais diretamente
// as funções, chamamos apenas uma função que retorna
// todas as outras
import album from './albums';
import search from './search';

import { API_URL } from '../../config/consts';

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;

    // Utilizando as funções que agora estão no obj album
    // para isso utilizamos o .bind(this) para fazer essa
    // essa ligação entre o album local com o album que foi
    // importado na classe, então a partir de agora, é
    // possível utilizar as funções que estão dentro do
    // obj album
    this.album = album.bind(this)();
    this.search = search.bind(this)();
  }

  request(url) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return fetch(url, headers);
  }
}
