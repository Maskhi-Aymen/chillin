import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {  MusicNote } from '@material-ui/icons';
import axios from 'axios';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


export default function EditPlaylist() {
    const [data, setData] = useState([]);
    const [dataSong, setDataSong] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    let lis = [];

    useEffect(() => {
        if (!isLoaded) {
            fetch(`http://localhost:8000/song`).then(response =>
                response.json()
            )
                .then(dataM => {
                    setData(dataM)
                })
                .catch(err => {
                    console.log(err)
                })
            fetch(`http://localhost:8000/playlistsong/${playlist['pl_id']}`).then(response =>
                response.json()
            )
                .then(dataM => {
                    setIsLoaded(true)
                    setDataSong(dataM)
                })
                .catch(err => {
                    console.log(err)
                })

        }
    })


    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const playlist = JSON.parse(localStorage.getItem("playlistselected"));

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.put("http://localhost:8000/playlist", JSON.stringify(
          {
            'pl_id':playlist['pl_id'],
            'pl_name':data.get('title'),
            'songs': checked,
            'pl_imgurl': data.get('imgURL'),
          }
        ),{
           headers: {
             "Content-Type": "application/json",
             "Authorization": "Bearer "
           }
         })
         .then((json) => {
          alert(json.data)
          window.location.reload(true)
         })
         .catch((err) => console.log(err));
       };

    const [checked, setChecked] = React.useState(playlist['songs']);


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };




    return (

        <div className="song">
            <div className="songContainer">
                <div className="songShow">


                    <Grid item xs={12} ms={4} sx={{ my: { xs: 2, md: 6 }, p: { xs: 2, md: 3 } }}>

                        <Typography variant="h6" gutterBottom>{playlist['pl_name']}</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }} >
                                <Stack direction="row" spacing={23}>
                                    <Avatar alt="PlayList" src={playlist['pl_imgurl']} variant="rounded" sx={{ width: 200, height: 200 }} />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="div">
                                    Songs list:
                                </Typography>
                                <Demo sx={{ backgroundColor: 'transparent' }}>
                                    <List dense={dense}>
                                        {dataSong.map((value) => {
                                            const labelId = `${value['id']}`;
                                            return (
                                                <ListItem key={value['id']} disablePadding>
                                                    <ListItemAvatar>
                                                        <MusicNote className="sidebarIcon" />
                                                    </ListItemAvatar>
                                                    <ListItemText id={labelId} primary={` ${value['name']}`} />

                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Demo>
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
                <div className="songUpdate">
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid item xs={12} ms={8} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                            <Typography variant="h6" gutterBottom>Edit playlist</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        defaultValue={playlist['pl_name']}
                                        id="title"
                                        name="title"
                                        label="Title"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="outlined"
                                    /></Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        defaultValue={playlist['pl_imgurl']}
                                        id="imgURL"
                                        name="imgURL"
                                        label="Cover URL"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="outlined"
                                    /></Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2} justifyContent="center" alignItems="center" xs={12}>
                                        <List dense sx={{ width: '100%', bgcolor: 'transparent' }}>
                                            {data.map((value) => {
                                                const labelId = `${value['id']}`;
                                                return (
                                                    <ListItem
                                                        key={value['id']}
                                                        secondaryAction={
                                                            <Checkbox
                                                                edge="end"
                                                                onChange={handleToggle(value['id'])}
                                                                checked={checked.indexOf(value['id']) !== -1}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        }
                                                        disablePadding
                                                    >
                                                        <ListItemButton>
                                                            <ListItemAvatar>
                                                                <MusicNote className="sidebarIcon" />
                                                            </ListItemAvatar>
                                                            <ListItemText id={labelId} primary={` ${value['name']}`} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" >Update</Button>
                                </Grid>
                            </Grid>

                        </Grid></Box>
                </div>
            </div>
        </div>

    );
}