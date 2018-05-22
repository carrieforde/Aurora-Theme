// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAPIData,
  getPostFromState,
  fetchPost
} from '../redux/actionCreators';
import Spinner from '../Spinner';

class Post extends Component {
  props: {
    isFetched: boolean,
    postSlug: string,
    post: Object,
    posts: Array<Object>,
    getPost: Function,
    getStoredPost: Function
  };

  componentDidMount() {
    const { isFetched, postSlug, posts, getPost, getStoredPost } = this.props;
    if (!isFetched) {
      getPost(postSlug);
    } else {
      getStoredPost(posts, postSlug);
    }
  }

  render() {
    const { post, postSlug } = this.props;
    let renderedPost;

    if (post && post.slug === postSlug) {
      renderedPost = (
        <article className="post">
          <header className="post__header">
            <h1 className="post__title">{post.title.rendered}</h1>
          </header>
          <div
            className="post__content"
            dangerouslySetInnerHTML={{
              __html: post.content.rendered
            }}
          />
        </article>
      );
    } else {
      renderedPost = <Spinner />;
    }

    return renderedPost;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    post: state.post,
    isFetched: state.isFetched
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getPost(postSlug) {
    dispatch(getAPIData(`wp/v2/posts/?slug=${postSlug}`, fetchPost));
  },
  getStoredPost(posts, postSlug) {
    dispatch(getPostFromState(posts, postSlug));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
