import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faCircle, faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(() => ({
  wrapper: {
    margin: '12px',
    borderTop: '1px solid grey',
    padding: '20px'
  },
  description: {
    fontSize: '12px',
    color: '#8c959f',
    marginTop: '8px'
  },
  panel: {
    marginTop: '8px'
  },
  panelItem: {
    fontSize: '12px',
    color: '#8c959f',
    marginRight: '12px'
  },
  icon: {
    marginRight: '4px',
    color: '#8c959f'
  },
  repoLink: {
    color: '#54aeff'
  }
}));

const RepoItem = ({ name, description, forkCount, stargazerCount, primaryLanguage }) => {
  const { userId } = useParams();
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div>
        <FontAwesomeIcon icon={faBookBookmark} className={classes.icon} />
        <Link to={`/${userId}/${name}/issues`}>
          <span className={classes.repoLink}>{name}</span>
        </Link>
      </div>
      <div className={classes.description}>{description}</div>
      <div className={classes.panel}>
        {primaryLanguage && (
          <span className={classes.panelItem}>
            <FontAwesomeIcon icon={faCircle} className={classes.icon} />
            {primaryLanguage.name}
          </span>
        )}
        <span className={classes.panelItem}>
          <FontAwesomeIcon icon={faStar} />
          {stargazerCount}
        </span>
        <span className={classes.panelItem}>
          <FontAwesomeIcon icon={faCodeBranch} />
          {forkCount}
        </span>
        <span className={classes.panelItem}>last updated at</span>
      </div>
    </div>
  );
};

RepoItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  forkCount: PropTypes.number.isRequired,
  stargazerCount: PropTypes.number.isRequired,
  primaryLanguage: PropTypes.string.isRequired
};

export default RepoItem;
