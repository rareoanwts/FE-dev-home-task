import React from 'react';
import PinnedRepoItem from './PinnedRepoItem';
import Grid from '@mui/material/Grid';

const PinnedRepos = ({ pinnedItems }) => {
  const itemToRender = pinnedItems.edges;

  return itemToRender.length > 0 ? (
    <Grid container>
      {itemToRender.map((item) => (
        <Grid item xs={6} key={item.name}>
          <PinnedRepoItem {...item.node} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <>You don't have any public repositories yet.</>
  );
};

export default PinnedRepos;
