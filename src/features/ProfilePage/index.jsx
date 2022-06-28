import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { getRepositories } from './query';

import Navbar from './Navbar';
import PinnedRepos from './PinnedRepos';
import UserInfo from './UserInfo';

const ProfilePage = (props) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={3}>
        <UserInfo />
      </Grid>
      <Grid item xs={6}>
        <Navbar {...props} />
        <PinnedRepos {...props} />
      </Grid>
    </Grid>
  );
};

const ProfilePageHOC = () => {
  const { userId } = useParams();
  const { data } = useQuery(getRepositories(userId));

  return data ? <ProfilePage {...data.repositoryOwner} /> : <></>;
};

export default ProfilePageHOC;
