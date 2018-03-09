import { FETCH_POSTS } from './actions';

// Define the default state.
const DEFAULT_STATE = {
  posts: [],
  isFetched: false
};

// Takes in state an action, and returns a new state.
/**
 * Updates state by taking in state and an action, and returns a new state.
 *
 * @param {any} state The state of our reducer.
 * @param {object} action The action of the reducer.
 * @returns {object} The new state.
 */
const fetchPosts = (state, action) =>
  Object.assign({}, state, { posts: action.payload, isFetched: true });

/**
 * Using the action.type, determine whether to update state, or get current state.
 *
 * @param {object} [state=DEFAULT_STATE] The state passed to the reducer.
 * @param {object} action The action object.
 * @returns {object} A state object.
 */
const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return fetchPosts(state, action);
    default:
      return state;
  }
};

export default rootReducer;
