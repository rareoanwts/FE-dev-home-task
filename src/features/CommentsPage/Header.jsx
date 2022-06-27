import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(() => ({
  headerWrapper: {
    paddingBottom: '20px',
    borderBottom: '1px solid grey',
    display: 'flex'
  },
  title: {
    display: 'inline',
    fontSize: '32px',
    marginBottom: '12px'
  },
  number: {
    fontSize: '32px'
  },
  status: {
    backgroundColor: '#2da44e',
    borderRadius: '2em',
    padding: '8px 12px',
    color: 'white',
    margitRight: '8px'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  bold: {
    fontWeight: 'bold'
  },
  newIssueButton: {
    backgroundColor: '#2da44e',
    borderColor: '#2da44e',
    borderRadius: '5px',
    padding: '5px 10px',
    marginLeft: 'auto',
    color: 'white',
    fontSize: '12px',
    alignSelf: 'center'
  }
}));

const Header = ({ closed, title, number, author, createdAt, commentsCount }) => {
  const classes = useStyles();

  return (
    <div className={classes.headerWrapper}>
      <div>
        <div className={classes.flex}>
          <div className={classes.title}>{title}</div>
          <div className={classes.number}>{`#${number}`}</div>
        </div>
        <div className={classes.flex}>
          <div className={classes.status}>
            <FontAwesomeIcon icon={closed ? faCheck : faCircleDot} />
            {closed ? 'Closed' : 'Open'}
          </div>
          <div>
            <span className={classes.bold}>{author.login}</span>
            {` opened this issue on ${createdAt} `}
            {commentsCount > 0 && `${commentsCount} comment${commentsCount > 1 ? 's' : ''}`}
          </div>
        </div>
      </div>
      <button className={classes.newIssueButton}>New issue</button>
    </div>
  );
};

Header.propTypes = {
  closed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.shape({
    login: PropTypes.string.isRequired
  }),
  commentsCount: PropTypes.number.isRequired
};

export default Header;
