import React, { useReducer, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect, useSelector } from 'react-redux';
import { signInAction } from '../../../../redux/actionCreators/authActions';
import { Redirect, Link } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn({ history, signIn }) {
  const classes = useStyles();

  const initialState = {
    email: '',
    password: '',
  };

  const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value,
    };
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const auth = useSelector((state) => state.firebase.auth);
  const [loading, setLoading] = useState(false);
  // Signing in the user
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // props => signIn
    signIn(state);
    if (auth.uid) {
      setLoading(false);
      history.push('/shop');
    }
    setLoading(false);
  };

  const { email, password } = state;
  const authError = useSelector((state) => state.auth.authError);

  return auth.uid ? (
    <Redirect to='/shop' />
  ) : (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleChange}
            value={email}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={handleChange}
            value={password}
          />
          {authError ? <p style={{ color: 'red' }}>{authError}</p> : null}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to='/signup'>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {loading ? <Spinner /> : null}
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signInAction(user)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
