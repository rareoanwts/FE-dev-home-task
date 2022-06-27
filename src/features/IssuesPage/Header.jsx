import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';

import CreateIssueDialog from './CreateIssueDialog';

const useStyles = makeStyles(() => ({
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
  newIssueButton: {
    backgroundColor: '#2da44e',
    borderRadius: '5px',
    padding: '8px 12px',
    color: 'white',
    marginLeft: 'auto',
    border: 'none',
    margin: '12px 8px 12px 0'
  }
}));

const Header = ({ repositoryId, active, setActive, openTotalCount, closedTotalCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={classes.action}>
        <div
          role="option"
          onClick={() => setActive('open')}
          className={clsx(classes.totalCount, {
            [classes.active]: active === 'open'
          })}
        >
          <FontAwesomeIcon icon={faCircleDot} className={classes.icon} />
          <span>{`${openTotalCount} Open`}</span>
        </div>
        <div
          role="option"
          onClick={() => setActive('closed')}
          className={clsx(classes.totalCount, {
            [classes.active]: active === 'closed'
          })}
        >
          <FontAwesomeIcon icon={faCheck} className={classes.icon} />
          <span>{`${closedTotalCount} Closed`}</span>
        </div>
        <button onClick={() => setIsModalOpen(true)} className={classes.newIssueButton}>
          New Issue
        </button>
      </div>
      <CreateIssueDialog onClose={onClose} isOpen={isModalOpen} repositoryId={repositoryId} />
    </div>
  );
};

Header.propTypes = {
  repositoryId: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  openTotalCount: PropTypes.number.isRequired,
  closedTotalCount: PropTypes.number.isRequired
};

export default Header;
