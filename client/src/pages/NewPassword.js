import * as React from 'react';
import { useEffect,useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useParams,useHistory } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from "../assets/images/logo.png"
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function NewPassword() {

    const [data,setdata]=useState([]);
    const history=useHistory();
    const [isLoaded,setIsLoaded]=useState(false);
    const user = useParams()
    let hi
    useEffect(()=>{
      if(!isLoaded){ 
       axios.post("http://127.0.0.1:8000/reset", JSON.stringify(
        {
          'token':user.userId
        }
      )).then(response=>{
         setIsLoaded(true)
         if(response.data==="error"){
             history.push('/');
         }else{
         setdata(response.data)
         localStorage.setItem('id',response.data['user_id'])
         }})
       .catch(err=>{
         console.log(err)
       })
       
     }
    },[])

    function validate(str) { 
        if (str.match( /[0-9]/g) && 
                str.match( /[A-Z]/g) && 
                str.match(/[a-z]/g) && 
                str.match( /[^a-zA-Z\d]/g) &&
                str.length >= 10) 
            return true;
        else 
            return false; 
        
    } 

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   if(data.get('confirmepassword')!==data.get('password')){
       alert("the password is incorrect")
   }
   else{if(validate(data.get('password')))
   {const id =localStorage.getItem('id')
    axios.put("http://localhost:8000/user", JSON.stringify(
        {
          'user_id': id,
          'user_password': data.get('password'),
        }
      ),{
         headers: {
           "Content-Type": "application/json",
           "Authorization": "Bearer "
         }
       }).then(localStorage.clear()).then(history.push('/'))
       .catch((err) => console.log(err));
     
   }
   else{
       alert("use another password !")
   }

   }
    console.log({
      email: data.get('confirmepassword'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
         <Grid
          item
          xs={false}
          sm={12}
          md={11.5}
          sx={{
            height:750,
            backgroundColor: (t) =>
              t.palette.mode === 'dark' ? t.palette.white[100] : t.palette.grey[200],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ><Grid container spacing={2} sx={{marginBottom:10,justifyContent:'center'}}>
          <img src={logo} width={300} style={{justifyContent:'center'}}></img>
         </Grid>
         <Typography variant="h6" component="h2">Reset Password</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
                  <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmepassword"
                  label="Confirme Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
             
              </Grid>
            </Grid>
            <Button
            className="waves-effect503"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:'#9D8189'}}
            >
              Save
            </Button>
           
          </Box>
        </Box>
        
      </Container></Grid>
    </ThemeProvider>
  );
}