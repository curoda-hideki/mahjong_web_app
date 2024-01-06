// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  appBar: {
    // position: 'fixed', // この行を削除
    background: 'white',
    // zIndex: theme.zIndex.drawer + 1, // この行を削除
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Link to="/">
          <img src="/images/home.png" alt="Home" style={{ width: '50px', height: '50px' }} />
        </Link>
        <Typography variant="h6" style={{ marginLeft: 'auto' }}>
          <Link to="/calculator">
            <img src="/images/acount.jpeg" alt="Calculator" style={{ width: '50px', height: '50px' }} />
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
