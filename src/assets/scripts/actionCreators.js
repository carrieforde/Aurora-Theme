import { FETCH_POSTS } from './actions';

/**
 * Returns a well-formatted response.
 *
 * @export
 * @param {any} posts The posts.
 * @returns {object}
 */
export function fetchPosts(posts) {
  return { type: FETCH_POSTS, payload: posts };
}
