import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faEnvelope, faDove } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { getUserProfile } from './query';

const useStyles = makeStyles(() => ({
  icon: {
    marginRight: '8px',
    color: '#8c959f'
  },
  itemBlock: {
    marginTop: '12px',
    color: '#57606a'
  },
  login: {
    fontSize: '24px'
  },
  name: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '8px 0'
  },
  image: {
    width: '90%',
    borderRadius: '50%',
    border: '2px solid grey'
  },
  button: {
    width: '100%',
    marginTop: '12px'
  }
}));

const UserInfo = ({ avatarUrl, name, login, following, followers, email, twitterUsername }) => {
  const classes = useStyles();

  return (
    <>
      <img src={avatarUrl} className={classes.image} />
      <div className={classes.name}>{name}</div>
      <div className={classes.login}>{login}</div>
      <Button variant="outlined" disabled className={classes.button}>
        Follow
      </Button>
      <div className={classes.itemBlock}>
        <FontAwesomeIcon icon={faUserGroup} className={classes.icon} />
        {`${followers.totalCount} followers`}
        {` ${following.totalCount} following`}
      </div>
      {email && (
        <div className={classes.itemBlock}>
          <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
          {email}
        </div>
      )}
      {twitterUsername && (
        <div className={classes.itemBlock}>
          <FontAwesomeIcon icon={faDove} className={classes.icon} />
          {twitterUsername}
        </div>
      )}
    </>
  );
};

UserInfo.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string,
  login: PropTypes.string.isRequired,
  following: PropTypes.shape({
    totalCount: PropTypes.number.isRequired
  }),
  followers: PropTypes.shape({
    totalCount: PropTypes.number.isRequired
  }),
  email: PropTypes.string,
  twitterUsername: PropTypes.string
};

UserInfo.defaultProps = {
  name: '',
  email: '',
  twitterUsername: ''
};

const UserInfoHOC = () => {
  const { userId } = useParams();
  const { data } = useQuery(getUserProfile(userId));

  return data ? <UserInfo {...data.user} /> : <></>;
};

export default UserInfoHOC;
