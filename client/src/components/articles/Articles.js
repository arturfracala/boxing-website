import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ArticleItem from './ArticleItem';
import ArticleForm from './ArticleFrom';
import { getArticles } from '../../actions/article';
import './Articles.css';

const Articles = ({ getArticles, article: { articles, loading }, auth }) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='mainHeader'>
        <h1>News</h1>
      </div>
      {!auth.loading &&
        auth.isAuthenticated &&
        auth.user.status === 'journalist' && <ArticleForm />}
      {articles.map(article => (
        <ArticleItem key={article._id} article={article} />
      ))}
    </Fragment>
  );
};

Articles.propTypes = {
  getArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getArticles }
)(Articles);
