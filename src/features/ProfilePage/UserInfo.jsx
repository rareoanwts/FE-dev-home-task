import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faEnvelope, faDove } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/system';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const StyledImage = styled('img')`
  width: 90%;
  border-radius: 50%;
  border: 2px solid grey;
`;

const StyledName = styled('div')`
  font-size: 36px;
  font-weight: bold;
  margin: 8px 0;
`;

const StyledLogin = styled('div')`
  font-size: 24px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 12px;
`;

const useStyles = makeStyles(() => ({
  icon: {
    marginRight: '8px',
    color: '#8c959f'
  },
  itemBlock: {
    marginTop: '12px',
    color: '#57606a'
  }
}));

const UserInfo = (props) => {
  const classes = useStyles();
  const { avatarUrl, name, login, following, followers, email, twitterUsername } = props;

  return (
    <>
      <StyledImage src={avatarUrl}></StyledImage>
      <StyledName>{name}</StyledName>
      <StyledLogin>{login}</StyledLogin>
      <StyledButton variant="outlined" disabled>
        Follow
      </StyledButton>
      <div className={classes.itemBlock}>
        <FontAwesomeIcon icon={faUserGroup} className={classes.icon} />
        {`${followers.totalCount} followers`}
        {`${following.totalCount} following`}
      </div>
      <div className={classes.itemBlock}>
        <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
        {email}
      </div>
      <div className={classes.itemBlock}>
        <FontAwesomeIcon icon={faDove} className={classes.icon} />
        {twitterUsername}
      </div>
    </>
  );
};

export default UserInfo;
