import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPIData } from '../redux/actionCreators';
import PostCard from '../PostCard/PostCard';

class Posts extends Component {
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.getPosts();
    }
  }

  render() {
    let posts;
    if (this.props.isFetched) {
      posts = this.props.posts.map(post => (
        <PostCard key={post.id} {...post} />
      ));
    } else {
      posts = <h2>Loading...</h2>;
    }
    return (
      <div>
        <h1>Hello</h1>
        {posts}
      </div>
    );
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
    dispatch(getAPIData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
