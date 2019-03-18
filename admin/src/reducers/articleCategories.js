const LOAD   = 'articleCategories/LOAD';

export const articleCategoriesLoad = (payload) => ({ type: LOAD, payload });

const initialState = {
  data: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default: return state;
  }
}
