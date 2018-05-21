// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPIData, fetchPosts } from '../redux/actionCreators';
import Spinner from '../Spinner';
import Post from './Post';

class Posts extends Component {
  props: {
    isFetched: boolean,
    getPosts: Function,
    posts: Array<Object>
  };

  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.getPosts();
    }
  }

  render() {
    const { isFetched } = this.props;
    let posts;
    if (isFetched) {
      posts = this.props.posts.map(post => <Post key={post.id} {...post} />);
    } else {
      posts = <Spinner />;
    }
    return <div>{posts}</div>;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    isFetched: state.isFetched
  };
};

const mapDispatchToProps = dispatch => ({
  getPosts() {
    dispatch(getAPIData('wp/v2/posts?_embed', fetchPosts));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
