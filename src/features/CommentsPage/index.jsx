import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { getIssueComments } from './query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import parse from 'html-react-parser';

const useStyles = makeStyles(() => ({
  headerWrapper: {
    paddingBottom: '20px',
    borderBottom: '1px solid grey',
    display: 'flex'
  },
  title: {
    display: 'inline',
    fontSize: '32px',
    marginBottom: '12px'
  },
  number: {
    fontSize: '32px'
  },
  status: {
    backgroundColor: '#2da44e',
    borderRadius: '2em',
    padding: '8px 12px',
    color: 'white',
    margitRight: '8px'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  bold: {
    fontWeight: 'bold'
  },
  newIssueButton: {
    backgroundColor: '#2da44e',
    borderColor: '#2da44e',
    borderRadius: '5px',
    padding: '5px 10px',
    marginLeft: 'auto',
    color: 'white',
    fontSize: '12px',
    alignSelf: 'center'
  },
  avatarImg: {
    borderRadius: '50px',
    width: '24px'
  },
  comment: {
    wordWrap: 'break-word'
  }
}));

const Comment = ({ bodyHTML, createdAt, author }) => {
  const { login, avatarUrl } = author;
  const classes = useStyles();

  return (
    <>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar src={avatarUrl} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: 'left' }}>
            <span>{login}</span>
            <span style={{ fontWeight: 'normal' }}>{` commented at ${createdAt}`}</span>
          </h4>
          <div className={classes.comment}>{parse(bodyHTML)}</div>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
    </>
  );
};

const Header = ({ closed, title, number, author, createdAt, commentsCount }) => {
  const classes = useStyles();

  return (
    <div className={classes.headerWrapper}>
      <div>
        <div className={classes.flex}>
          <div className={classes.title}>{title}</div>
          <div className={classes.number}>{`#${number}`}</div>
        </div>
        <div className={classes.flex}>
          <div className={classes.status}>
            <FontAwesomeIcon icon={closed ? faCheck : faCircleDot} />
            {closed ? 'Closed' : 'Open'}
          </div>
          <div>
            <span className={classes.bold}>{author.login}</span>
            {` opened this issue on ${createdAt} `}
            {commentsCount > 0 && `${commentsCount} comment${commentsCount > 1 ? 's' : ''}`}
          </div>
        </div>
      </div>
      <button className={classes.newIssueButton}>New issue</button>
    </div>
  );
};

const Comments = ({ closed, title, number, createdAt, author, comments }) => {
  return (
    <>
      <Header
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
            <Comment {...node} />
          ))}
        </Paper>
      ) : (
        'No comments yet'
      )}
    </>
  );
};

const CommentsHOC = () => {
  const { userId, repo, issueNumber } = useParams();
  const { data } = useQuery(getIssueComments({ userId, repoName: repo, issueNumber }));

  return data ? (
    <Grid container justifyContent="center">
      <Grid xs={8} item>
        <Comments {...data.repository.issue} />
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default CommentsHOC;
