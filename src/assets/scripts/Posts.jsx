import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPIData } from './actionCreators';
import Post from './Post';

class Posts extends Component {
  componentDidMount() {
    if (!this.props.isFetched) {
      this.props.getPosts();
    }
  }
  render() {
    // console.log('props: ' + this.props.fetchPosts);

    let posts;
    if (this.props.isFetched) {
      console.log(this.props.posts);

      posts = this.props.posts.map(post => (
        <h3 className="cat">{post.title.rendered}</h3>
      ));

      // posts = this.props.posts;
    } else {
      posts = <h2>Loading...</h2>;
    }
    return (
      <div>
        <h1>Hello</h1>
        {posts}
        <Post />
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
