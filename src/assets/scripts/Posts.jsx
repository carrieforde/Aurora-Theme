import React from 'react';
import { connect } from 'react-redux';

const Posts = props => {
  console.log(props);

  return <div>Hello</div>;
};

const mapStateToProps = state => ({ fetchPosts: state.fetchPosts });

export default connect(mapStateToProps)(Posts);
