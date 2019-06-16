import * as constants from './constants';

const initialState = {
  sort: {
    column: null,
    desc: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
  case constants.TOGGLE_SORT_COLUMN:
    return {
      ...state,
      sort: {
        ...state.sort,
        column: action.payload,
      },
    };
  case constants.TOGGLE_SORT_BY:
    return {
      ...state,
      sort: {
        ...state.sort,
        desc: !state.sort.desc,
      },
    };
  default:
      return state;
  }
};

