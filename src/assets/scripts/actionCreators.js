import axios from 'axios';
import { FETCH_POSTS } from './actions';

/**
 * Returns a well-formatted action object.
 *
 * @export
 * @param {any} posts The posts.
 * @returns {object}
 */
export function fetchPosts(posts) {
  return { type: FETCH_POSTS, payload: posts };
}

// will return a thunk. a function that returns a function.
export function getAPIData() {
  return dispatch => {
    axios
      .get('http://aurora.local/wp-json/wp/v2/posts')
      .then(response => {
        console.log(response.data); // eslint-disable-line no-console
        dispatch(fetchPosts(response.data));
      })
      .catch(error => {
        console.error('axios error', error);
      });
  };
}
