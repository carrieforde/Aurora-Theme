import axios from 'axios';
import { FETCH_POSTS, FETCH_POST } from './actions';

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

export function fetchPost(post) {
  return { type: FETCH_POST, payload: post[0] };
}

// will return a thunk. a function that returns a function.
export function getAPIData(url, cb) {
  return dispatch => {
    axios
      .get(url)
      .then(response => {
        dispatch(cb(response.data));
      })
      .catch(error => {
        console.error('axios error', error);
      });
  };
}

export function getPostFromState(posts, slug) {
  const post = posts.filter(post => post.slug === slug);
  return fetchPost(post);
}
