import React, { useState ,useEffect} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import TypeWriter from 'typewriter-effect';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactLoading from "react-loading";
import "../assets/styles/Signin.style.css";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/logo.png"


export default function SignInSide({userid}) {
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
  const History = useHistory();
  useEffect(()=>{
  localStorage.clear()
  localStorage.setItem('user',0)
  localStorage.setItem('admin',false)
  
  },[])
  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("false");
  const [user_mail, setadminmail] = useState("");
  const [user_password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    
    fetch(`http://127.0.0.1:8000/login/${user_mail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_mail":data.get('email'),
       "user_password":data.get('password'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        if (data.user_id!=0) {    
          
          if(data.admin==true){
            setTimeout(() =>{localStorage.setItem("userinfo",JSON.stringify(data));localStorage.setItem("user",data.user_id);localStorage.setItem("admin",true);History.push('/admin');setLoading(false)},1000) ;
            }
          else{ 
            setTimeout(() =>{localStorage.setItem("userinfo",JSON.stringify(data));localStorage.setItem("user",data.user_id);History.push('/home');setLoading(false)},1000) ;
          
        }
          if (user_password !== "" && user_mail !== "") {
            setError(true);
            setTimeout(() => setError(false), 2500);
          } 
          userid(data.id,data.admin);
        }
        else {
          setTimeout(() => window.location.reload(), 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={12}
          md={11.5}
        ><img src={logo} className="login_logo" ></img>
         <Grid item xs={12} sm={10} md={10} component={Paper} elevation={12} square  sx={{float: 'right',
        backgroundColor:'hsl(3 39% 100%/.5)'
      }}>
          <Box className="login_container"
            sx={{
              my: 13,
              mx: 7,
            }}
          >
            <h1>WELCOME BACK !</h1>
            <TypeWriter onInit={(typewriter)=>{typewriter.typeString("ch9awlek f Faza!").pauseFor(2000).deleteAll().typeString("a9wa Chillin'").start()}}/>
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
                autoFocus 
                onChange={(e) => {setadminmail(e.target.value);console.log(user_mail);} }
              />
              <br></br>
              <TextField
                margin="normal"
                required
               fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              /><br></br>

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
                "LOGIN"
              )}
            </button><br/> 
            <Link href="/resetpassword" variant="body2" sx={{color:'#9d8189dc'}} >
                    Forgot password?
                  </Link><br/>
            
              <Grid container>
               <button 
              className="waves-effect503"
              type="submit"
              name="actio3n"
              onClick={() => History.push('/registre') }
              style={{
                opacity: "100% !important", 
                backgroundColor: loading ? "#ffff":"#ffff"  ,
              }}
            >Create an Account</button>
              </Grid>
              
            </Box>
          </Box>
        </Grid></Grid>
      </Grid>
    </ThemeProvider>
  );
}
