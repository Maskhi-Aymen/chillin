import * as React from 'react';
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import CakeIcon from '@mui/icons-material/Cake';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const currencies = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Normal user',
    label: 'Normal user',
  },
];

export default function Account() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      dateofbirth: data.get('date-of-birth'),
      usertype: data.get('usertype'),
      objective: data.get('objective'),
    });
  };

  const [currency, setCurrency] = React.useState('Normal user');
  const user = localStorage.getItem('user');
  const [isLoaded, setIsLoaded] = useState(false);
  const [datas, setdatas] = useState(JSON.parse(localStorage.getItem("userinfo")));
  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const isMatch =useMediaQuery(theme.breakpoints.down('md'))

  return (
    <div className='yellocard'>
      {isMatch?(<>
      <Box component="div" onSubmit={handleSubmit} sx={{ display: 'contents' }}>
        <Grid item xs={12} ms={4} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor:'#f4acb72f' }}>
            <Typography variant="h5" gutterBottom>{datas['user_name'] + ' ' + datas['user_Lastname']}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <Stack direction="row" spacing={2}>
                  <Avatar alt="UserAvatar" src={datas['user_avatar']} sx={{ width: 100, height: 100 }} variant="rounded" />
                  <Grid item xs={4} sm={6} sx={{ display: 'flex', }} >
                    <div className="userShowBottom">
                      <span className="userShowTitle">Personal Information</span>
                      <div className="userShowInfo">
                        <PermIdentity className="userShowIcon" />
                        <span className="userShowInfoTitle">{datas["user_name"] + " " + datas["user_Lastname"]}</span>
                      </div>
                      <div className="userShowInfo">
                        <CakeIcon className="userShowIcon" />
                        <span className="userShowInfoTitle">{datas["user_date_birth"]}</span>
                      </div>
                      <span className="userShowTitle">Contact Details</span>
                      <div className="userShowInfo">
                        <MailOutline className="userShowIcon" />
                        <span className="userShowInfoTitle">{datas["user_mail"]}</span>
                      </div>
                      <span className="userShowTitle"> Account Details</span>
                      <div className="userShowInfo">
                        <CalendarToday className="userShowIcon" />
                        <span className="userShowInfoTitle">{datas["user_dateOfJoin"]}</span>
                      </div>
                    </div>
                  </Grid>
                </Stack>
                <Grid item xs={4} sm={9}>

                </Grid>

              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} ms={8} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } , backgroundColor:'#f4acb72f' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <Stack direction="row" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt="Remy Sharp" src={datas['user_avatar']} />
                  </StyledBadge>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  defaultValue={datas["user_name"]}
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
                  defaultValue={datas["user_Lastname"]}
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
                  defaultValue={datas["user_mail"]}
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
                  defaultValue={datas["user_password"]}
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
                  defaultValue={datas["user_date_birth"]}
                  id="date-of-birth"
                  name="date-of-birth"
                  label="Date of birth"
                  type="date"
                  InputLabelProps={{ shrink: true, }}
                  fullWidth
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CssButton type="submit" variant="contained" sx={{ width: 300, height: 50 }} >Update</CssButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box></>):(<>
      <Box component="div" onSubmit={handleSubmit} sx={{ display: 'flex' }}>
        <Grid item xs={12} ms={4} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, backgroundColor:'#f4acb72f' }}>
            <Typography variant="h5" gutterBottom>{datas['user_name'] + ' ' + datas['user_Lastname']}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <Stack direction="row" spacing={2}>
                  <Avatar alt="UserAvatar" src={datas['user_avatar']} sx={{ width: 300, height: 300 }} variant="rounded" />
                  <Grid item xs={4} sm={6} sx={{ display: 'flex', }} >
                    <div className="userShowBottom">
                      <span className="userShowTitle">Personal Information</span>
                      <div className="userShowInfo">
                        <PermIdentity className="userShowIcon" />
                        <span className="userShowInfoTitle">{datas["user_name"] + " " + datas["user_Lastname"]}</span>
                      </div>
                      <div className="userShowInfo">
                        <CakeIcon className="userShowIcon" />
                        <span className="userShowInfoTitle">{datas["user_date_birth"]}</span>
                      </div>
                      <span className="userShowTitle">Contact Details</span>
                      <div className="userShowInfo">
                        <MailOutline className="userShowIcon" />
                        <span className="userShowInfoTitle">{datas["user_mail"]}</span>
                      </div>
                      <span className="userShowTitle"> Account Details</span>
                      <div className="userShowInfo">
                        <CalendarToday className="userShowIcon" />
                        <span className="userShowInfoTitle">{datas["user_dateOfJoin"]}</span>
                      </div>
                    </div>
                  </Grid>
                </Stack>
                <Grid item xs={4} sm={9}>

                </Grid>

              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} ms={8} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } , backgroundColor:'#f4acb72f' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <Stack direction="row" spacing={2}>
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                  >
                    <Avatar alt="Remy Sharp" src={datas['user_avatar']} />
                  </StyledBadge>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  defaultValue={datas["user_name"]}
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
                  defaultValue={datas["user_Lastname"]}
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
                  defaultValue={datas["user_mail"]}
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
                  defaultValue={datas["user_password"]}
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
                  defaultValue={datas["user_date_birth"]}
                  id="date-of-birth"
                  name="date-of-birth"
                  label="Date of birth"
                  type="date"
                  InputLabelProps={{ shrink: true, }}
                  fullWidth
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CssButton type="submit" variant="contained" sx={{ width: 300, height: 50 }} >Update</CssButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box></>)}
    </div>
  );
}


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));

const theme = createTheme({
  status: {
    danger: '#F4ACB7',
  },
  palette: {
    primary: {
      main: '#4493f',
      darker: '#053e85',
    },
    neutral: {
      main: '#F4ACB7',
      contrastText: '#D8E2DC',
    },
  },
});
