import * as constants from './constants';

export const toggleSortColumn = (column) => ({ type: constants.TOGGLE_SORT_COLUMN, payload: column });
export const toggleSortBy = (direction) => ({ type: constants.TOGGLE_SORT_BY, payload: direction });
