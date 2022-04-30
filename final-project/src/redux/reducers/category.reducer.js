const initialState = {
  category: [],
};

const CategoryReducer = (state = initialState, action) => {
    switch (action.type){
        case "GET_CATEGORY_SUCCESS":
            return {...state, category: action.payload};
        default:
            return state;
    }
}

export {CategoryReducer};