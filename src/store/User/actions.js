import * as constants from './constants';

export const addToWatchList = (coin) => ({ type: constants.ADD_TO_WATCH_LIST, payload: coin });
