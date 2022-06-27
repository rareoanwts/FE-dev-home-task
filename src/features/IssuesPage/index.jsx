import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import pick from 'lodash/pick';
import { getIssuesByRepoName } from './query';
import Header from './Header';
import IssueRecord from './IssueRecord';
import Context from './Context';

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

const IssuesPage = ({ id, closed, open, issues }) => {
  const classes = useStyles();
  const [active, setActive] = useState('open');

  return (
    <div className={classes.wrapper}>
      <Header
        repositoryId={id}
        active={active}
        setActive={setActive}
        closedTotalCount={closed.totalCount}
        openTotalCount={open.totalCount}
      />
      <div className={classes.table}>
        {issues.edges.map(({ node }) => (
          <IssueRecord
            key={node.id}
            {...pick(node, ['id', 'author', 'createdAt', 'number', 'title', 'comments', 'closed'])}
          />
        ))}
      </div>
    </div>
  );
};

const IssuesPageHOC = () => {
  const { userId, repo } = useParams();
  const { data, refetch } = useQuery(getIssuesByRepoName({ userId, repoName: repo }));

  return data ? (
    <Context.Provider value={{ refetch }}>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <IssuesPage {...data.repository} />
        </Grid>
      </Grid>
    </Context.Provider>
  ) : (
    <></>
  );
};

IssuesPage.propTypes = {
  id: PropTypes.string.isRequired,
  closed: PropTypes.number.isRequired,
  open: PropTypes.number.isRequired,
  issues: PropTypes.shape({
    edges: PropTypes.array.isRequired
  })
};

export default IssuesPageHOC;
