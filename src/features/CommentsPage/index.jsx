import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { getIssueComments } from './query';
import Header from './Header';
import Comment from './Comment';
import Context from './Context';

const Comments = ({ id, closed, title, number, createdAt, author, comments }) => {
  return (
    <>
      <Header
        issueId={id}
        author={author}
        closed={closed}
        title={title}
        number={number}
        createdAt={createdAt}
        commentsCount={comments.totalCount}
      />
      {comments.edges.length > 0 ? (
        <Paper style={{ padding: '40px 20px' }}>
          {comments.edges.map(({ node }) => (
            <Comment key={node.id} {...node} />
          ))}
        </Paper>
      ) : (
        'No comments yet'
      )}
    </>
  );
};

Comments.propTypes = {
  id: PropTypes.string.isRequired,
  closed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  comments: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
    edges: PropTypes.array.isRequired
  })
};

const CommentsHOC = () => {
  const { userId, repo, issueNumber } = useParams();
  const { data, refetch } = useQuery(getIssueComments({ userId, repoName: repo, issueNumber }));

  return data ? (
    <Context.Provider value={{ refetch }}>
      <Grid container justifyContent="center">
        <Grid xs={8} item>
          <Comments {...data.repository.issue} />
        </Grid>
      </Grid>
    </Context.Provider>
  ) : (
    <></>
  );
};

export default CommentsHOC;
