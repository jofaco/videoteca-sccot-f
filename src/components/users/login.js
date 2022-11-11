import React, { useState, useEffect } from "react";
//dependencies
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser"
//MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Notification from "../Notification";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.contrastText
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),    
  },
  texto: {
    
    backgroundColor: theme.palette.common.white,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({onLogin}) {
  const history = useNavigate();
  const {isLoginLoading, hasLoginError, login, isLogged} = useUser()
  const [errorMessage, setErrorMessage] = useState("");
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const Notificacion = Notification();
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  useEffect(() => {
    if (isLogged) {
      history('/')
      onLogin && onLogin();
      window.location.reload();
    }
  }, [history, isLogged,onLogin]);

  useEffect(() => {
    if (hasLoginError) {
      setErrorMessage("Credenciales erroneas");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }, [hasLoginError])
  
  const handleLogin = (e) => {
    e.preventDefault();    
    login({
      username: formData.email,
      password: formData.password,
    })    
  };

  const classes = useStyles();

  return (
    <>{isLoginLoading && <strong>Checking credentials...</strong>}
      {!isLoginLoading &&
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              className={classes.texto} 
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
            className={classes.texto}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>        
        </div>
      </Container>
       }
       { hasLoginError &&  <Notificacion message={errorMessage} />
       }
      
    </>
  );
}
