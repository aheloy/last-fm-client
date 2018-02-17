import * as Actions from 'src/actions';


const initialState = {
  albums: [],
}

const artists = (state = initialState, action) => {
  switch (action.type) {
    case Actions.request_suffix(Actions.GET_ARTIST_ALBUMS):
      return {
        status: 'request',
      };

    case Actions.success_suffix(Actions.GET_ARTIST_ALBUMS):
      return {
        albums: action.payload.topalbums.album,
        status: 'success',
      };

    case Actions.fail_suffix(Actions.GET_ARTIST_ALBUMS):
      return {
        status: 'fail',
      };

    default:
      return state;
  }
};

export default artists;
