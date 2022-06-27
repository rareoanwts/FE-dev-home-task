import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleDot, faMessage } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginLeft: '8px'
  },
  smallText: {
    fontSize: '12px',
    color: 'grey',
    marginTop: '12px'
  },
  issueItem: {
    display: 'flex',
    borderTop: '1px solid grey',
    padding: '12px'
  },
  icon: {
    marginRight: '10px'
  },
  commentsCount: {
    marginLeft: 'auto'
  }
}));

const IssueRecord = ({ id, author, createdAt, number, title, comments, closed }) => {
  const classes = useStyles();
  const commentsCount = comments.totalCount;

  console.log("ID: ", id);

  return (
    <div className={classes.issueItem}>
      <div>
        <div>
          <FontAwesomeIcon icon={closed ? faCheck : faCircleDot} />
          <Link to={`${number}`} className={classes.title}>
            {title}
          </Link>
        </div>
        <div className={classes.smallText}>
          {`#${number} opened on ${createdAt} by author ${author.login}`}
        </div>
      </div>
      {commentsCount > 0 && (
        <Link to={`${number}`} className={classes.commentsCount}>
          <FontAwesomeIcon icon={faMessage} className={classes.icon} />
          {commentsCount}
        </Link>
      )}
    </div>
  );
};

IssueRecord.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  createdAt: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  comments: PropTypes.shape({
    totalCount: PropTypes.number.isRequired
  }),
  closed: PropTypes.bool.isRequired
};

export default IssueRecord;
