import { Input ,Button} from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from "react";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { alpha, styled } from '@mui/material/styles';

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
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));
const currencies = [
    {
        value: 'Plan type 1',
        label: 'Plan type 1',
    },
    {
        value: 'Plan type 2',
        label: 'Plan type 2',
    },
    {
        value: 'Plan type 3',
        label: 'Plan type 3',
    },
  ];

export default function NewPlan() {
  const history= useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            title: data.get('title'),
            plantype: data.get('plantype'),
        });
        axios.post("http://localhost:8000/plan", JSON.stringify(
          {
            'plan_name':data.get('title'),
            'plan_type': currency,
          }
        ),{
           headers: {
             "Content-Type": "application/json",
             "Authorization": "Bearer "
           }
         })
         .then((json) => {
          alert(json.data)
          history.push('./plans')
         })
         .catch((err) => console.log(err));
    };

    const [currency, setCurrency] = React.useState('Plan type 1');
    
        const handleChange = (event) => {
          setCurrency(event.target.value);
        };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Plan</h1>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <CssTextField
                                required
                                id="title"
                                name="title"
                                label="Title"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                id="plantype"
                                select
                                label="Select the plan type"
                                fullWidth
                                value={currency}
                                onChange={handleChange}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </CssTextField>
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
                </Box>
    </div>
  );
}
