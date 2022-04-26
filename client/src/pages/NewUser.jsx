import {Button} from "@mui/material";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import av0 from '../assets/images/avatar/avatar0.jpg';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import {styled } from '@mui/material/styles';
import SelectAvatar from "../components/components/SelectAvatarNewUser";

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));
const currencies = [
  {
      value: true,
      label: 'Admin',
  },
  {
      value: false,
      label: 'Simple user',
  },
];

export default function NewUser() {
    const history =useHistory();
    const [photo, setphoto] = useState(av0)
    const chooseAvatar= (e)=>{
        setphoto(e)
      }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget); 
    let k = new Date(data.get('date-of-birth'))
    k = k.getFullYear() + '-' + k.getMonth() + '-' + k.getDate()
    console.log(k)
    axios.post("http://localhost:8000/user", JSON.stringify(
        {
          'user_name':data.get('firstName'),
          'user_Lastname': data.get('lastName'),
          'admin': currency,
          'user_mail': data.get('email'),
          'user_password': data.get('password'),
          'user_date_birth': k,
          'user_objectifs': data.get('objectives'),
          'user_avatar':photo,
        }
      ),{
         headers: {
           "Content-Type": "application/json",
           "Authorization": "Bearer "
         }
       })
       .then((json) => {
        alert(json.data)
        history.push('./users')
       })
       .catch((err) => console.log(err));
     };


const [currency, setCurrency] = React.useState(false);

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
  return (
    <div className="newUser" > 
      <h1 className="newUserTitle">New User</h1>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },backgroundColor:'transparent' }}>
          <SelectAvatar setavatar={e => setphoto(e)} oldavatar={photo}/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="date-of-birth"
                                name="date-of-birth"
                                label="Date of birth"
                                type="date"
                                InputLabelProps={{shrink: true,}}
                                fullWidth
                                autoComplete="off"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="usertype"
                                select
                                label="Select user type"
                                fullWidth
                                value={currency}
                                onChange={handleChange}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            id="objectives"
                            name="objectives"
                            label="Objectives"
                            multiline
                            fullWidth
                            rows={4}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} margin='auto'>  
                            <CssButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                onSubmit={handleSubmit}
                                >
                                Create
                            </CssButton>                        
                        </Grid>
                    </Grid>
                </Paper>
                </Box>
    </div>
  );
}
