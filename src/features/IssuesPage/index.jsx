import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleDot, faMessage } from '@fortawesome/free-solid-svg-icons';
import { getIssuesByRepoName, getIssueComments } from './query';

const useStyles = makeStyles(() => ({
  wrapper: {
    border: '1px solid grey',
    borderRadius: '10px'
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginLeft: '8px'
  },
  smallText: {
    fontSize: '12px',
    color: 'grey',
    marginTop: '12px'
  },
  issueItem: {
    display: 'flex',
    borderTop: '1px solid grey',
    padding: '12px'
  },
  action: {
    display: 'flex',
    backgroundColor: '#d0d7de',
    borderRadius: '10px 10px 0 0'
  },
  totalCount: {
    margin: '12px',
    color: 'grey',

    '&:hover': {
      cursor: 'pointer'
    }.cursor
  },
  icon: {
    marginRight: '10px'
  },
  active: {
    color: 'black'
  },
  commentsCount: {
    marginLeft: 'auto'
  }
}));

const IssueRecord = ({ author, createdAt, number, title, comments, closed }) => {
  const classes = useStyles();
  const commentsCount = comments.totalCount;

  return (
    <div className={classes.issueItem}>
      <div>
        <div>
          <FontAwesomeIcon icon={closed ? faCheck : faCircleDot} />
          <Link to={`${number}`} className={classes.title}>
            {title}
          </Link>
        </div>
        <div className={classes.smallText}>
          {`#${number} opened on ${createdAt} by author ${author.login}`}
        </div>
      </div>
      {commentsCount > 0 && (
        <Link to={`${number}`} className={classes.commentsCount}>
          <FontAwesomeIcon icon={faMessage} />
          {commentsCount}
        </Link>
      )}
    </div>
  );
};

const Header = ({ active, setActive, openTotalCount, closedTotalCount }) => {
  const classes = useStyles();

  return (
    <div className={classes.action}>
      <div
        role="option"
        onClick={() => setActive('open')}
        className={clsx(classes.totalCount, { [classes.active]: active === 'open' })}
      >
        <FontAwesomeIcon icon={faCircleDot} className={classes.icon} />
        <span>{`${openTotalCount} Open`}</span>
      </div>
      <div
        role="option"
        onClick={() => setActive('closed')}
        className={clsx(classes.totalCount, { [classes.active]: active === 'closed' })}
      >
        <FontAwesomeIcon icon={faCheck} className={classes.icon} />
        <span>{`${closedTotalCount} Closed`}</span>
      </div>
    </div>
  );
};

const IssuesPage = ({ closed, open, issues }) => {
  const classes = useStyles();
  const [active, setActive] = useState('open');

  return (
    <div className={classes.wrapper}>
      <Header
        active={active}
        setActive={setActive}
        closedTotalCount={closed.totalCount}
        openTotalCount={open.totalCount}
      />
      <div className={classes.table}>
        {issues.edges.map(({ node }) => (
          <IssueRecord {...node} />
        ))}
      </div>
      <div></div>
    </div>
  );
};

const IssuesPageHOC = () => {
  const [page, setPage] = useState();
  const { userId, repo } = useParams();
  const { data } = useQuery(getIssuesByRepoName({ userId, repoName: repo }));

  return data ? (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <IssuesPage {...data.repository} />
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default IssuesPageHOC;
