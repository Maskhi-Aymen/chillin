import "../assets/styles/newPublication.css";
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
import { useHistory } from "react-router-dom";

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
        value: 'image',
        label: 'Image',
    },
    {
        value: 'video',
        label: 'Video',
    },
    {
        value: 'text',
        label: 'Text',
    },
  ];

export default function NewPublication() {
  const user=localStorage.getItem('user');
  const history=useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post("http://localhost:8000/publication", JSON.stringify(
      {
        'published':true,
        'pub_type': currency,
        'pub_title': data.get('title'),
        'pub_description': data.get('description'),
        'pub_url': data.get('pubURL'),
        'pub_author':user,
      }
    ),{
       headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer "
       }
     })
     .then((json) => {
      alert(json.data)
      history.push('./publications')
     })
     .catch((err) => console.log(err));
   
};

const [currency, setCurrency] = React.useState('text');

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
  return (
    <div className="newPublication">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 },backgroundColor:'transparent' }}>
                <Typography variant="h6" gutterBottom>Add new publication</Typography>
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
                                id="pubtype"
                                select
                                label="Select publication type"
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
                        <Grid item xs={12}>
                            <CssTextField
                                required
                                id="pubURL"
                                name="pubURL"
                                label="URL"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                            id="description"
                            name="description"
                            label="Description"
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
        <div className="addPublicationItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
*/
