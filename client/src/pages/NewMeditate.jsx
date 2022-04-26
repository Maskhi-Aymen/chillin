import { Button} from "@mui/material";
import Box from '@mui/material/Box';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import {styled } from '@mui/material/styles';

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));


export default function NewMeditate() {
    const history =useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post("http://localhost:8000/meditate", JSON.stringify(
            {
              'med_name':data.get('medname'),
              'med_description': data.get('description'),
              'med_imgurl': data.get('imgURL'),
              'med_songurl': data.get('songURL'),
            }
          ),{
             headers: {
               "Content-Type": "application/json",
               "Authorization": "Bearer "
             }
           })
           .then((json) => {
            alert(json.data)
            history.push('./meditate')
           })
           .catch((err) => console.log(err));
    };


const [currency, setCurrency] = React.useState('Normal user');

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New meditation</h1>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } ,backgroundColor:'transparent'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <TextField
                                required
                                id="medname"
                                name="medname"
                                label="Meditation name"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            id="description"
                            name="description"
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="imgURL"
                                name="imgURL"
                                label="Image URL"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="songURL"
                                name="songURL"
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
