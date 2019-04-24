# Hands-on TDD Spotify API

## Smoke tests
Importante para verificar se as rotas existem
1) search(genérico) - + de 1 tipo
2) searchAlbums
3) searchArtists
4) searchTracks
5) searchPlayLists

#### Algumas libs necessárias
1) **sinon**
1) **sinon-chai**
2) **sinon-stub-promise** porque iremos lidar com funções
assíncronas (fetch)
3) **node-fetch** porque como estamos testando no próprio mocka,
sem usar um browser, então não temos o fetch dentro no node,
então esse node-fetch é um polyfill para conseguirmos utilizar
o fetch 
