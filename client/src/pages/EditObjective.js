import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';
import {  styled } from '@mui/material/styles';

export default function EditObjective() {
    const user=JSON.parse(localStorage.getItem('userinfo'));
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
	  const res =  axios.put('http://localhost:8000/user', {"user_id":user['user_id'],
	  "user_objectifs":data.get('objective'), });
		  window.location.reload(true)
    };

    return (
        <div className='yellocard'>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom>Edit your Objective:</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CssTextField
                                    id="objectives"
                                    name="objectives"
                                    defaultValue={user['user_objectifs'] }
                                    placeholder='My objective ............................................................................................................................................................................................................................................................................................................................................'
                                    multiline
                                    fullWidth
                                    rows={7}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CssButton type="submit" fullWidth variant="contained">Update</CssButton>
                            </Grid>
                        </Grid>
                </Container>
            </Box>

        </div>
    )

}
const CssButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#F4ACB7'),
    backgroundColor:'#F4ACB7' ,
    color:'#ffff',
    '&:hover': {
      backgroundColor: '#F4ACB7',
    },
  }));
  
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