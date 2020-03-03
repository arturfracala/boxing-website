import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getArticle } from '../../actions/article';
import './Article.css';

const Article = ({
  getArticle,
  article: { article, loading },
  match,
  auth
}) => {
  useEffect(() => {
    getArticle(match.params.id);
  }, [getArticle, match.params.id]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : article ? (
        <Fragment>
          <div className='articleContainer'>
            <div className='titleArticle'>{article.title}</div>
            <div className='infoContainer'>
              Posted on <Moment format='YYYY/MM/DD'>{article.date}</Moment> by{' '}
              {article.name}.
            </div>
            <div>{article.text}</div>
            {auth.isAuthenticated && <CommentForm articleId={article._id} />}
            <div className='commentsHeader'>Comments</div>
            <div className='comments'>
              {article.comments.map(comment => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  articleId={article._id}
                />
              ))}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <button
            className='backButton'
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
          <Spinner />
        </Fragment>
      )}
    </div>
  );
};

Article.propTypes = {
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getArticle }
)(Article);
