import axios from 'axios';


export const request_suffix = action => action + '_REQUEST';
export const success_suffix = action => action + '_SUCCESS';
export const fail_suffix = action => action + '_FAIL'; 

export const SEARCH_ARTISTS = 'SEARCH_ARTISTS';
export const GET_ARTIST_ALBUMS = 'GET_ARTIST_ALBUMS';


export const searchArtists = (text = '') => {
  return (dispatch) => {
    dispatch({
      type: request_suffix(SEARCH_ARTISTS),
    });

    const request = axios.get('/', {
      params: {
        method: 'artist.search',
        format: 'json',
        artist: text,
      }
    });

    return request.then((response) => {
      dispatch({
        type: success_suffix(SEARCH_ARTISTS),
        payload: response.data,
      });
    }, (err) => {
      dispatch({
        type: fail_suffix(SEARCH_ARTISTS),
      });
    });
  };
};

export const getAlbumsByArtist = (mbid = '') => {
  return (dispatch) => {
    dispatch({
      type: request_suffix(GET_ARTIST_ALBUMS),
    });

    const request = axios.get('/', {
      params: {
        method: 'artist.getTopAlbums',
        format: 'json',
        artist: mbid,
      }
    });

    return request.then((response) => {
      dispatch({
        type: success_suffix(GET_ARTIST_ALBUMS),
        payload: response.data,
      });
    }, (err) => {
      dispatch({
        type: fail_suffix(GET_ARTIST_ALBUMS),
      });
    });
  };
};
