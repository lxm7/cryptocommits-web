import * as constants from './constants';

import { fromStorage } from '../../helpers/persistedData';

const initialState = {
  watchList: fromStorage() || [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case constants.ADD_TO_WATCH_LIST: {
    // State resets back to 0 even when we have entires localstroage
    if (state.watchList.length > 0) {
      window.localStorage.setItem('watchList', JSON.stringify(state.watchList));
    }

    // Otherwise continue as normal, update wathclist and set to storage
    const a = [...state.watchList, action.payload];
    window.localStorage.setItem('watchList', JSON.stringify(a));

    return {
      ...state,
      watchList: [...state.watchList, action.payload],
    };
  }
  default:
    return state;
  }
};

