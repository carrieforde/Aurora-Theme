// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAPIData,
  fetchPosts,
  setCurrentPostPage
} from '../redux/actionCreators';
import Button from '../Button';

type Props = {
  getPosts: Function,
  updatePostPage: Function,
  posts: Array<Object>,
  currentPage: number,
  totalPages: number
};

class Pagination extends Component<Props> {
  getPreviousPage = () => {
    const { getPosts, updatePostPage, currentPage, totalPages } = this.props,
      newPage = currentPage + 1;

    getPosts(newPage);
    updatePostPage(newPage);
  };

  getNextPage = () => {
    const { getPosts, updatePostPage, currentPage, totalPages } = this.props,
      newPage = currentPage - 1;

    getPosts(newPage);
    updatePostPage(newPage);
  };

  render() {
    const { currentPage, totalPages } = this.props;

    let previous, next;

    if (currentPage < totalPages) {
      previous = (
        <Button
          text="Previous"
          classname="button--previous"
          action={this.getPreviousPage}
        />
      );
    }

    if (1 < currentPage) {
      next = (
        <Button
          text="Next"
          classname="button--next"
          action={this.getNextPage}
        />
      );
    }
    return (
      <div className="pagination">
        {previous}
        {next}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    currentPage: state.currentPage,
    totalPages: state.totalPages
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  getPosts(page) {
    dispatch(getAPIData(`wp/v2/posts?_embed&page=${page}`, fetchPosts));
  },
  updatePostPage(page) {
    dispatch(setCurrentPostPage(page));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
