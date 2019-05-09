import { expect } from 'chai';

import SpotifyWrapper from '../index';

import { exists } from '../../../util/expects';

describe('Index Library', () => {
  it('should create an instance of Spotify Wrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'blabla',
    });
    expect(spotify.apiURL).to.be.equal('blabla');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });

    expect(spotify.token).to.be.equal('foo');
  });

  describe('request method', () => {
    it('should have request method', () => {
      const spotify = new SpotifyWrapper({});
      exists(spotify.request)
    })
  })
});
