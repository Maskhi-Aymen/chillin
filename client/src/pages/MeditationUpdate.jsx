import { Link } from "react-router-dom";
import Player from '../components/meditate/Player';
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

export default function Meditation() {
  const history=useHistory();
  const meditate =JSON.parse(localStorage.getItem("meditateSelected"))  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 axios.put("http://localhost:8000/meditate", JSON.stringify(
   {
     'med_id':meditate['med_id'],
     'med_name':data.get('name'),
     'med_description': data.get('description'),
     'med_imgurl': data.get('imgurl'),
     'med_songurl': data.get('songurl'),
   }
 ),{
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "
    }
  })
  .then((json) => {
   alert(json.data)
   history.push('/meditate')
  })
  .catch((err) => console.log(err));
};

  return (
    <div className="song">
      <div className="songTitleContainer">

      </div>
      <div className="songContainer">
        <div className="songShow">
          <Player/>
        </div>
        <div className="songUpdate">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <h1 className="newUserTitle">Edit Song</h1>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },backgroundColor:'transparent' }}>
                
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <CssTextField
                                defaultValue={meditate['med_name']}
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
                                defaultValue={meditate['med_description']}
                                id="description"
                                name="description"
                                label="Description"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                required
                                defaultValue={meditate['med_imgurl']}
                                id="imgurl"
                                name="imgurl"
                                label="Cover URL"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                required
                                defaultValue={meditate['med_songurl']}
                                id="songurl"
                                name="songurl"
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
                                Update
                            </CssButton>                        
                        </Grid>
                    </Grid>
                </Paper>
            
        </Box>
         </div>
      </div>
    </div>
  );
}
