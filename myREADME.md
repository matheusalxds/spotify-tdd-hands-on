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

#### O que testar então?
* Testar se algo é um object, pois se ao instanciar algo pode
ser que retorne oura coisa *(expect(x).to.be.an.object)*
* Testar se algo ou se uma função existe *(expect(x).to.exist)*
* Testar se a função foi chamada *(expect(x).to.have.been.calledOnce)*
* Testar se um obj com nested fields é igual *(expect(x).to.be.eql(y))*
* Testar se um valor é igual a outro *(expect(x).to.be.equal(y))*
