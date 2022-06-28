import React from 'react';
import PropTypes from 'prop-types';
import PinnedRepoItem from './PinnedRepoItem';
import Grid from '@mui/material/Grid';

const PinnedRepos = ({ pinnedItems, repositories }) => {
  const itemToRender = pinnedItems.edges.length > 0 ? pinnedItems.edges : repositories.edges;

  return (
    <Grid container>
      {itemToRender.length > 0 ? (
        itemToRender.map((item) => (
          <Grid item xs={6} key={item.node.name}>
            <PinnedRepoItem {...item.node} />
          </Grid>
        ))
      ) : (
        <Grid item xs={6}>
          You don&apos;t have any public repositories yet.
        </Grid>
      )}
    </Grid>
  );
};

PinnedRepos.propTypes = {
  pinnedItems: PropTypes.shape({
    edges: PropTypes.array.isRequired
  }),
  repositories: PropTypes.shape({
    edges: PropTypes.array.isRequired
  })
};

export default PinnedRepos;
