import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { getUserProfile } from './query';

import Navbar from './Navbar';
import PinnedRepos from './PinnedRepos';
import UserInfo from './UserInfo';

const ProfilePage = (props) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <UserInfo {...props} />
      </Grid>
      <Grid item xs={8}>
        <Navbar {...props} />
        <PinnedRepos {...props} />
      </Grid>
    </Grid>
  );
};

const ProfilePageHOC = () => {
  const { userId } = useParams();
  const { data } = useQuery(getUserProfile(userId));

  return data ? <ProfilePage {...data.repositoryOwner} /> : <></>;
};

export default ProfilePageHOC;
