import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button , { ButtonProps }from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import axios from "axios";
import { Select } from "@mui/material";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#F4ACB7',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#F4ACB7',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#F4ACB7',
    },
    '&:hover fieldset': {
      borderColor: '#F4ACB7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#F4ACB7',
    },
  },
});
const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));
const currencies = [
  {
      value: true,
      label: 'Sleep',
  },
  {
      value: false,
      label: 'PlayList',
  },
];

export default function NewSong() {
  const history=useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 axios.post("http://localhost:8000/song", JSON.stringify(
   {
     'name':data.get('name'),
     'singer': data.get('singer'),
     'sleep': currency,
     'url': data.get('url'),
   }
 ),{
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "
    }
  })
  .then((json) => {
   alert(json.data)
   history.push('./songs')
  })
  .catch((err) => console.log(err));
};

const [currency, setCurrency] = React.useState(false);

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
  return (
    <div className="newPublication">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <h1 className="newUserTitle">New Song</h1>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },backgroundColor:'transparent' }}>
                
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <CssTextField
                                required
                                id="name"
                                name="name"
                                label="Title"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <CssTextField
                                required
                                id="singer"
                                name="singer"
                                label="singer"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                id="sleep"
                                label="Select the song type"
                                fullWidth
                                value={currency}
                                onChange={handleChange}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                required
                                id="url"
                                name="url"
                                label="Song URL"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} margin='auto'>  
                            <CssButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                >
                                Submit
                            </CssButton>                        
                        </Grid>
                    </Grid>
                </Paper>
            
        </Box>
    </div>
  );
}
/*
 * 
*/
