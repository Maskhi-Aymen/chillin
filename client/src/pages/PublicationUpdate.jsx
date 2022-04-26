import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "../assets/styles/publication.css";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';
import Article from "../components/components/Article";
import Chip from '@mui/material/Chip';
import { MenuItem,RadioGroup,FormLabel,Radio,Button,Box,Paper } from '@material-ui/core';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SegmentIcon from '@mui/icons-material/Segment';
import PhotoIcon from '@mui/icons-material/Photo';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
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


export default function Publication() {
  const history=useHistory();
  const [user, setuser] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const pub = JSON.parse(localStorage.getItem("pubSelected"));
  const pubauthor = localStorage.getItem("pub_author");


  useEffect(() => {
    if (!isLoaded) {
      fetch(`http://localhost:8000/getuser/${pubauthor}`).then(response =>
        response.json()
      )
        .then(dataM => {
          setIsLoaded(true)
          setuser(dataM)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },[])
 
  const [currency, setCurrency] = useState(pub["pub_type"]);

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
  const [pubStatus, setpubStatus] = useState(pub["published"]);

  const handleChangeStatus = (event) => {
      setpubStatus(event.target.value);
    };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        title: data.get('title'),
        pubURL: data.get('pubURL'), 
        description: data.get('description'),
    });
    axios.put("http://localhost:8000/publication", JSON.stringify(
      {
        'pub_id':pub['pub_id'],
        'published':pubStatus,
        'pub_type': currency,
        'pub_title': data.get('title'),
        'pub_description': data.get('description'),
        'pub_url': data.get('pubURL'),
        'pub_author':pub['pub_author'],
      }
    ),{
       headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer "
       }
     })
     .then((json) => {
      alert(json.data)
      history.push('/publications')
     })
     .catch((err) => console.log(err));
  }
 
  return (
    <div className="publication">
      <div className="publicationTop">
        <div className="publicationTopLeft">

          <Article type={pub["pub_type"]} auteur={user["user_name"] + " " + user["user_Lastname"]} url={pub["pub_url"]} datepub={pub["pub_date"]} avatar={user["user_avatar"]} description={pub["pub_title"]} moreinfo={pub["pub_description"]} />
        </div>
        <div className="publicationTopRight">
          <div className="publicationInfoTop">
            {(pub["pub_type"] === "text") ? <SegmentIcon /> : <></>}
            {(pub["pub_type"] === "video") ? <OndemandVideoIcon /> : <></>}
            {(pub["pub_type"] === "image") ? <PhotoIcon /> : <></>}
            <span className="publicationName">Publication</span>
          </div>
          <div className="publicationInfoBottom">
            <div className="publicationInfoItem">
              <span className="publicationInfoKey">id:</span>
              <span className="publicationInfoValue">{pub["pub_id"]}</span>
            </div>

            <div className="publicationInfoItem">
              <span className="publicationInfoKey">Date:</span>
              <span className="publicationInfoValue">{pub["pub_date"]}</span>
            </div>
            <div className="publicationInfoItem">
              <span className="publicationInfoKey">Author:</span>
              <span className="publicationInfoValue">{user["user_name"] + " " + user["user_Lastname"]}</span>
            </div>
            <div className="publicationInfoItem">
            </div>
            <div className="publicationInfoItem">
              <span className="publicationInfoKey">Staus:</span>
              <span className="publicationInfoValue">{(pub["published"] === true) ? <Chip label="Published" sx={{ backgroundColor: '#F4ACB7' }} variant="outlined" /> 
              : <Chip label=" Not Published" sx={{ backgroundColor: '#9D8189' }} variant="outlined" />}</span>
            </div>
            <div className="publicationInfoItem">
              <span className="publicationInfoKey">Private: </span>
              <span className="publicationInfoValue">{(pub["private"] === true) ? <AdminPanelSettingsIcon /> : <PublicIcon/>}</span>
            </div>
            <div className="publicationInfoItem">
              <span className="publicationInfoKey">Reactions:</span>
              <span className="publicationInfoValue">{pub['pub_reactions'].length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="publicationBottom">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3,backgroundColor:'transparent'  }}>
                <Typography variant="h6" gutterBottom>Edit publication</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <CssTextField
                                required
                                defaultValue={pub['pub_title']}
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
                                defaultValue={pub['pub_url']}
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
                            defaultValue={pub['pub_description']}
                            name="description"
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                id="pubtype"
                                select
                                label="Select publication type"
                                fullWidth
                                value={pubStatus}
                                onChange={handleChangeStatus}
                            >
                                {Status.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </CssTextField>
                        </Grid>
                        <Grid item xs={12} md={6} margin='auto'>  
                           {(pub['private'])?<CssButton type="submit" fullWidth    variant="contained" disabled> Update </CssButton>
                            :<CssButton type="submit" fullWidth    variant="contained" > Update </CssButton>  }                        
                        </Grid>
                    </Grid>
          
            
        </Box>
      </div>
    </div>
  );
}
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
const Status = [
  {
      value: true,
      label: 'Published',
  },
  {
      value: false,
      label: 'Not Published',
  },
];