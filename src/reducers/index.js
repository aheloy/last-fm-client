import { combineReducers } from 'redux';

import artists from './artists';
import artist from './artist';

const rootReducer = combineReducers({ artists, artist });

export default rootReducer;
