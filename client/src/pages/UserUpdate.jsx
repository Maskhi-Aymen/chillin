import {
  CalendarToday,
  MailOutline,
  PermIdentity
} from "@material-ui/icons";
import * as React from 'react';
import { TextField,Button } from "@material-ui/core";
import dayjs from 'dayjs';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import "../assets/styles/user.css";
import {  useState} from "react";
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import SelectAvatar from "../components/components/SelectAvatarNewUser";


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

export default function UserEdit() {
  const user =JSON.parse(localStorage.getItem("userSelected"));
  const history =useHistory();
  const [photo, setphoto] = useState(user['user_avatar'])
 
  const chooseAvatar= (e)=>{
      setphoto(e)
    }
const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget); 
  axios.put("http://localhost:8000/user", JSON.stringify(
      {
        'user_id':user['user_id'],
        'user_name':data.get('firstName'),
        'user_Lastname': data.get('lastName'),
        'admin': currency,
        'user_mail': data.get('email'),
        'user_password': data.get('password'),
        'user_date_birth': dayjs(data.get('date-of-birth')).format('YYYY-MM-DD'),
        'user_avatar':photo,
        'user_dateOfJoin':dayjs(user['user_dateOfJoin']).format('YYYY-MM-DD'),
      }
    ),{
       headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer "
       }
     })
     .then((json) => {
      localStorage.setItem('userSelected',JSON.stringify(
        {
          'user_id':user['user_id'],
          'user_name':data.get('firstName'),
          'user_Lastname': data.get('lastName'),
          'admin': currency,
          'user_mail': data.get('email'),
          'user_password': data.get('password'),
          'user_date_birth': dayjs(data.get('date-of-birth')).format('YYYY-MM-DD'),
          'user_avatar':photo,
          'user_dateOfJoin':dayjs(user['user_dateOfJoin']).format('YYYY-MM-DD')
        }))
      window.location.reload(true)
     })
     .catch((err) => console.log(err));
   };

  const [currency, setCurrency] = React.useState(user['admin']);

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };

  return (
    <div className="user">
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user["user_avatar"]}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user["user_name"]+" "+ user["user_Lastname"]}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Personal Information</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_name"]+" "+ user["user_Lastname"]}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_date_birth"]}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_mail"]}</span>
            </div>
            <span className="userShowTitle"> Account Details</span>
            <div className="userShowInfo">
              <PersonPinIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_type"]}</span>
            </div>
            <div className="userShowInfo">
            <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_dateOfJoin"]}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      
          <SelectAvatar setavatar={e=>setphoto(e)} oldavatar={photo}/>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <CssTextField
                                required
                                defaultValue={user['user_name']}
                                id="firstName"
                                name="firstName"
                                label="First name"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CssTextField
                                required
                                defaultValue={user['user_Lastname']}
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                fullWidth
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                required
                                defaultValue={user['user_mail']}
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CssTextField
                                required
                                defaultValue={user['user_password']}
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
                            <CssTextField
                                required
                                defaultValue={user['user_date_birth']}
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
                            <CssTextField
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
                            </CssTextField>
                        </Grid>
                        <Grid item xs={12} md={6} margin='auto'>  
                            <Button
                                type="submit"
                                fullWidth
                                sx={{backgroundColor:'#F4ACB7'}}
                                variant="contained"
                                onSubmit={handleSubmit}
                                >
                                Update
                            </Button>                        
                        </Grid>
                    </Grid>
                </Box>
          
          
          
        </div>
      </div>
    </div>
  );
}
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
  /**
   * <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user["user_mail"]}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">New York | USA</span>
            </div>
   */