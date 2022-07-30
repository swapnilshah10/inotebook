import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { LockOutlinedIcon } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Alert from '@mui/material/Alert';
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link as RouterLink }  from "react-router-dom" ;
import Error from './Error'


let url = "https://inotebook123.herokuapp.com/login/";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        inotebooks
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  let onpassChange = (e) => {
    setPassword(e.target.value);
  };

  let onnameChange = (e) => {
    setUsername(e.target.value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    await axios
      .post(url, data)
      .then((res) => {  
        console.log(res)
        localStorage.setItem('token', res.data.token)
        setLogin(true);
      })
      .catch((err) => {

      setError(JSON.parse(err.request.response))
    });

  };
  const [isLoggedIn, setLogin] = useState(false);

  
  if (isLoggedIn) {
    return <Navigate to="/notes" />;
  }

  if(localStorage.getItem('token')){
    return <Navigate to="/notes" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/note-taking.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
           
            <Error error={error.error}/>
           
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="Username"
                autoComplete="Username"
                autoFocus
                onChange={onnameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onpassChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>
              <Grid container  >
               
                <Grid item  >
                  <RouterLink to="/register2" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </RouterLink>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}