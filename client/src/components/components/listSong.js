import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import PlayCircleFilledWhiteTwoToneIcon from '@mui/icons-material/PlayCircleFilledWhiteTwoTone';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

export default function InteractiveList({ handleSong }) {
    const [dense, setDense] = React.useState(false);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>

                    <List sx={{
                        maxWidth: 400,
                        bgcolor: '#fffff',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 780,
                        '& ul': { padding: 0 },
                    }}
                        subheader={<li />}>
                        {datas.filter((val) => {
                            return val.song.toLowerCase();
                        }).map((val, key) => {
                            return (<div key='val.id' >
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="play" onClick={() => { handleSong(val.type) }}>
                                            <PlayCircleFilledWhiteTwoToneIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MusicVideoIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={val.song}
                                        secondary={val.singer}
                                    />      <StyledRating
                                        name="customized-color"
                                        defaultValue={val.rating}
                                        getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                        precision={0.5}
                                        icon={<FavoriteIcon fontSize="inherit" />}
                                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                    />
                                </ListItem>

                            </div>)
                        })}
                    </List>

                </Grid>
            </Grid>
        </Box>
    );
}

const datas = [
    { id: 1, singer: "adel", rating: "2", song: "Hello", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/solas-innofgoodfortune/Solas-InnOfGoodFortune.mp3", },
    { id: 2, singer: "eminem", rating: "1", song: "pluie", type: "https://img.pikbest.com/houzi/audio/original/2020/09/27/09ad111ed57da784e236cd8214669499.mp3", },
    { id: 3, singer: "snoop", rating: "2", song: "vent", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/aeroheadcallingout/Aerohead_CallingOut.mp3", },
    { id: 11, singer: "Om Kolyhoum", rating: "3", song: "Hello", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/niwel-takayama/Niwel-Takayama.mp3", },
    { id: 12, singer: "Klay", rating: "4", song: "buy", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/kai-engel-maree/KaiEngel-Maree.mp3", },
    { id: 13, singer: "Chabi", rating: "2", song: "hi", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/aeroheadcallingout/Aerohead_CallingOut.mp3", },
    { id: 21, singer: "Pitbul", rating: "3", song: "Hello", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/niwel-takayama/Niwel-Takayama.mp3", },
    { id: 22, singer: "Riahanna", rating: "1", song: "buy", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/kai-engel-maree/KaiEngel-Maree.mp3", },
    { id: 23, singer: "Gims", rating: "4", song: "hi", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/aeroheadcallingout/Aerohead_CallingOut.mp3", },
    { id: 101, singer: "Om Kolyhoum", rating: "3", song: "Hello", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/niwel-takayama/Niwel-Takayama.mp3", },
    { id: 120, singer: "Klay", rating: "4", song: "buy", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/kai-engel-maree/KaiEngel-Maree.mp3", },
    { id: 130, singer: "Chabi", rating: "2", song: "hi", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/aeroheadcallingout/Aerohead_CallingOut.mp3", },
    { id: 210, singer: "Pitbul", rating: "3", song: "Hello", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/niwel-takayama/Niwel-Takayama.mp3", },
    { id: 220, singer: "Riahanna", rating: "1", song: "buy", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/kai-engel-maree/KaiEngel-Maree.mp3", },
    { id: 230, singer: "Gims", rating: "4", song: "hi", type: "https://www.auboutdufil.com/get.php?fla=https://archive.org/download/aeroheadcallingout/Aerohead_CallingOut.mp3", },

];