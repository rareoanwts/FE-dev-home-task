import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookBookmark, faCircle, faCodeBranch, faStar } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(() => ({
  wrapper: {
    borderRadius: '10px',
    margin: '12px',
    border: '1px solid grey',
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

const PinnedRepoItem = ({ name, description, forkCount, stargazerCount, primaryLanguage }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div>
        <FontAwesomeIcon icon={faBookBookmark} className={classes.icon} />
        <span className={classes.repoLink}>{name}</span>
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
      </div>
    </div>
  );
};

PinnedRepoItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  forkCount: PropTypes.number,
  stargazerCount: PropTypes.number,
  primaryLanguage: PropTypes.shape({
    name: PropTypes.string
  })
};

PinnedRepoItem.defaultProps = {
  forkCount: 0,
  stargazerCount: 0,
  primaryLanguage: {}
};

export default PinnedRepoItem;
