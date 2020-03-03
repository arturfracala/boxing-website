import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPosts, changePage } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostFrom from './PostForm';
import PostItem from './PostItem';
import { connect } from 'react-redux';
import './Posts.css';

const Posts = ({
  getPosts,
  changePage,
  post: { posts, loading, currentPage },
  auth
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const postsPerPage = 8;

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Logic for displaying current todos
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleClick = event => {
    changePage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <button
        className='postPageSwitch'
        key={number}
        id={number}
        onClick={e => handleClick(e)}
      >
        {number}
      </button>
    );
  });

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='mainHeader'>
        <h1>Forum</h1>
      </div>
      {auth.isAuthenticated && <PostFrom />}
      {currentPosts.map(post => (
        <PostItem key={post._id} post={post} />
      ))}
      <div className='pageNumbers'>{renderPageNumbers}</div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPosts, changePage }
)(Posts);
