import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookBookmark,
  faBookOpen,
  faTable,
  faCube,
  faStar
} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: '#fff'
  },
  navlinks: {
    display: 'flex',
    background: 'none'
  },
  link: {
    padding: '8px 12px',
    textDecoration: 'none',
    color: 'black',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#ebedf0',
      borderRadius: '5px'
    }
  },
  reposCount: {
    borderRadius: '20px',
    backgroundColor: 'grey',
    marginLeft: '8px',
    fontSize: '12px',
    padding: '4px 8px',
    fontWeight: 'bold'
  },
  icon: {
    marginRight: '8px'
  }
}));

const Navbar = ({ starredRepositories, repositories }) => {
  const classes = useStyles();
  const { userId } = useParams();

  return (
    <AppBar position="static" elevation={0} style={{ backgroundColor: '#fff' }}>
      <Toolbar>
        <div className={classes.navlinks}>
          <Link to={`/${userId}`} className={classes.link}>
            <FontAwesomeIcon icon={faBookOpen} className={classes.icon} />
            Overview
          </Link>
          <Link to={`/${userId}/repositories`} className={classes.link}>
            <FontAwesomeIcon icon={faBookBookmark} className={classes.icon} />
            Repositories
            <span className={classes.reposCount}>{repositories.totalCount}</span>
          </Link>
          <Link to="/contact" className={classes.link}>
            <FontAwesomeIcon icon={faTable} className={classes.icon} />
            Projects
          </Link>
          <Link to="/faq" className={classes.link}>
            <FontAwesomeIcon icon={faCube} className={classes.icon} />
            Packages
          </Link>
          <Link to="/" className={classes.link}>
            <FontAwesomeIcon icon={faStar} className={classes.icon} />
            Stars
            <span>{starredRepositories.totalCount}</span>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  starredRepositories: PropTypes.shape({
    totalCount: PropTypes.number.isRequired
  }),
  repositories: PropTypes.shape({
    totalCount: PropTypes.number.isRequired
  })
};

export default Navbar;
