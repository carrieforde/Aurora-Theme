// @flow
import axios from 'axios';
import { ROOT_URL, FETCH_POSTS, FETCH_POST } from './actions';

/**
 * Returns a well-formatted action object.
 *
 * @export
 * @param {any} posts The posts.
 * @returns {object}
 */
export function fetchPosts(posts: Array<Object>) {
  return { type: FETCH_POSTS, payload: posts };
}

export function fetchPost(post: Array<Object>) {
  return { type: FETCH_POST, payload: post[0] };
}

// will return a thunk. a function that returns a function.
export function getAPIData(endpoint: string, cb: Function) {
  return (dispatch: Function) => {
    axios
      .get(`${ROOT_URL}/wp-json/${endpoint}`)
      .then(response => {
        dispatch(cb(response.data));
      })
      .catch(error => {
        console.error('axios error', error);
      });
  };
}

export function getPostFromState(posts: Array<Object>, slug: string) {
  const post = posts.filter(post => post.slug === slug);
  return fetchPost(post);
}
