import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // ここにログイン処理を追加
    console.log(`Login clicked with username: ${username} and password: ${password}`);
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5" gutterBottom>
          ログイン
        </Typography>
        <TextField
          className={classes.textField}
          label="ユーザー名"
          variant="outlined"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          className={classes.textField}
          label="パスワード"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          ログイン
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginForm;