import { expect } from 'chai';

import SpotifyWrapper from '../index';

import { exists, equally, calledOnce, calledWith } from '../../../util/expects';
import sinon from 'sinon';

describe('Index Library', () => {
  it('should create an instance of Spotify Wrapper', () => {
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.be.an.instanceOf(SpotifyWrapper);
  });

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyWrapper({
      apiURL: 'blabla',
    });
    equally(spotify.apiURL, 'blabla');
  });

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyWrapper({});
    equally(spotify.apiURL, 'https://api.spotify.com/v1');
  });

  it('should receive token as an option', () => {
    const spotify = new SpotifyWrapper({
      token: 'foo',
    });

    equally(spotify.token, 'foo');
  });

  describe('request method', () => {
    let stubedFetch;
    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch');
      stubedFetch.resolves(data => data);
    });

    afterEach(() => {
      stubedFetch.restore();
    });

    it('should have request method', () => {
      const spotify = new SpotifyWrapper({});
      exists(spotify.request);
    });

    it('should can fetch when request', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url').then(() => {
      });
      calledOnce(stubedFetch);
    });

    it('should can fetch with the right url passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });
      spotify.request('url').then(() => {
      });
      calledWith(stubedFetch, 'url');
    });

    it('should call fetch with right right headers passed', () => {
      const spotify = new SpotifyWrapper({
        token: 'foo',
      });

      const headers = {
        headers: {
          Authorization: `Bearer foo`,
        },
      };

      spotify.request('url');
      // expect(stubedFetch).to.have.been.calledWith('url', headers)
      calledWith(stubedFetch, 'url', headers);
    });
  });
});
