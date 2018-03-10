import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAPIData,
  getPostFromState,
  fetchPost
} from '../redux/actionCreators';

class Post extends Component {
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.getPost(this.props.postSlug);
    } else {
      this.props.getStoredPost(this.props.posts, this.props.postSlug);
    }
  }

  render() {
    console.log(this.props);

    let post;

    if (this.props.post && this.props.post.slug === this.props.postSlug) {
      post = (
        <article className="post">
          <header className="post__header">
            <h1 className="post__title">{this.props.post.title.rendered}</h1>
          </header>
          <div
            className="post__content"
            dangerouslySetInnerHTML={{
              __html: this.props.post.content.rendered
            }}
          />
        </article>
      );
    } else {
      post = <h2>Loading...</h2>;
    }

    return post;
  }
}

const mapStateToProps = state => {
  console.log(state);

  return {
    posts: state.posts,
    post: state.post,
    isFetched: state.isFetched
  };
};

const mapDispatchToProps = dispatch => ({
  getPost(postSlug) {
    dispatch(
      getAPIData(
        `https://aurorathe.me/wp-json/wp/v2/posts/?slug=${postSlug}`,
        fetchPost
      )
    );
  },
  getStoredPost(posts, postSlug) {
    dispatch(getPostFromState(posts, postSlug));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
