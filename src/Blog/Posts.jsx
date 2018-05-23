// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAPIData,
  fetchPosts,
  setCurrentPostPage
} from '../redux/actionCreators';
import Spinner from '../Spinner';
import Post from './Post';
import Pagination from './Pagination';

type Props = {
  isFetched: boolean,
  getPosts: Function,
  updatePostPage: Function,
  posts: Array<Object>,
  totalPages: number
};

class Posts extends Component<Props> {
  componentDidMount() {
    const { isFetched, getPosts, updatePostPage } = this.props;
    if (!isFetched) {
      getPosts();
      updatePostPage(1);
    }
  }

  render() {
    const { isFetched, posts, totalPages } = this.props;

    let renderedPosts;
    if (isFetched) {
      renderedPosts = posts.map(post => <Post key={post.id} {...post} />);
    } else {
      renderedPosts = <Spinner />;
    }
    return (
      <div>
        {renderedPosts}
        {1 < totalPages ? <Pagination /> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    isFetched: state.isFetched,
    totalPages: state.totalPages
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getPosts() {
    dispatch(getAPIData('wp/v2/posts?_embed', fetchPosts));
  },
  updatePostPage(page) {
    dispatch(setCurrentPostPage(page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
