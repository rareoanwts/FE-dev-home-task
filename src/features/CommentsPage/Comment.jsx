import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import parse from 'html-react-parser';

const useStyles = makeStyles(() => ({
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

Comment.propTypes = {
  bodyHTML: PropTypes.string.isRequred,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired
  })
};

export default Comment;
