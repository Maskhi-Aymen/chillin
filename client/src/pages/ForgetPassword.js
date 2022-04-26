import React, { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bg from '../assets/images/background.jpg'
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import ReactLoading from "react-loading";
import "../assets/styles/Signin.style.css";
import Typography from '@mui/material/Typography';
import logo from "../assets/images/logo.png"

export default function ForgetPassword() {
  const theme = createTheme({
    status: {
      danger: '#F4ACB7',
    },
    palette: {
      primary: {
        main: '#fff',
        darker: '#053e85',
      },
      neutral: {
        main: '#F4ACB7',
        contrastText: '#D8E2DC',
      },
    },
  });
  const [loading, setLoading] = useState(false);

  const [reponse, setreponse] = useState('');
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
 


  const handleSubmit = (event) => {
    event.preventDefault();
    const dataA = new FormData(event.currentTarget);
    setLoading(true);
    fetch(`http://127.0.0.1:8000/mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'email':dataA.get('email')
      }),
    })
      .then((res) => res.json())
      .then((data) => {
       setreponse(data)
       setLoading(false);
       handleAffiche()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAffiche = () => {
    setOpen(false)
   setOpenAlert(true)
 };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={12}
          md={4.5}
          sx={{
            
            backgroundImage: `url(${bg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'dark' ? t.palette.grey[500] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
         <Grid item xs={1} sm={1} md={10} component={Paper} elevation={12} square  sx={{float: 'right',opacity:'0.7',height:743,
        backgroundColor: 'primary.main',
      }}>
          <Box className="login_container"
            sx={{
              my: 14.5,
              mx: 7
            }}
          >
            <Grid container spacing={2} sx={{marginBottom:10,justifyContent:'center'}}>
          <img src={logo} width={300} style={{justifyContent:'center'}}></img>
         </Grid>
            <Typography variant="h6" component="h2">Reset Password</Typography>
            <Typography variant="h9" >Please enter your email address to search for your account.</Typography>
             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ opacity:'3' }} >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                variant="outlined"
              />
              <br></br>
              <br></br>

            <button
              className="waves-effect505"
              type="submit"
              name="action"
              style={{
                opacity: "100% !important",border:"#FFCAD4",color:'white',
                backgroundColor: loading ? "#9d8189dc":"#9d8189dc"  ,
              }}
              disabled={loading}
            >
              {loading ? (
                <ReactLoading
                  height={"20px"}
                  width={"24px"}
                  className="loading1"
                  type="spin"
                />
              ) : (
                "Send"
              )}
            </button><br/>     
            </Box>
          </Box>
        </Grid></Grid>
      </Grid>
      <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleClose} style={{ backgroundColor:"#F4ACB7"}}>
            {reponse}
          </Alert>
        </Snackbar>
    </ThemeProvider>
  );
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}