import * as Actions from 'src/actions';


const initialState = {
  artists: [],
}

const artists = (state = initialState, action) => {
  switch (action.type) {
    case Actions.request_suffix(Actions.SEARCH_ARTISTS):
      return {
        searchStatus: 'request',
      };

    case Actions.success_suffix(Actions.SEARCH_ARTISTS):
      return {
        items: action.payload.results.artistmatches.artist,
        searchStatus: 'success',
      };

    case Actions.fail_suffix(Actions.SEARCH_ARTISTS):
      return {
        searchStatus: 'fail',
      };

    default:
      return state;
  }
};

export default artists;
