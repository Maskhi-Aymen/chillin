import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import pauseicon from '../../assets/images/o.images/Asset_4icon_PCD.png';
import playicon from '../../assets/images/o.images/Asset_3icon_PCD.png';
import previcon from '../../assets/images/o.images/Asset_2gicon_PCD.png';
import nexticon from '../../assets/images/o.images/Asset_2icon_PCD.png';
import styled from '@emotion/styled';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export default function MusicCard({ singer, name, url }) {
  const theme = useTheme(); 
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation
const [position, setPosition] = React.useState(0);

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioPlayer.current.volume = volume / 100;
};
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    setPosition(progressBar.current.value)
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = (e) => {
    progressBar.current.value = Number(progressBar.current.value - e);
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 5);
    changeRange();
  }
  
  

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === 'dark' ? '#9D8189' : '#9D8189';
  const lightIconColor =
    theme.palette.mode === 'dark' ? '#9D8189' : '#9D8189';

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
    <Widget>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CoverImage>
         <MusicNoteIcon sx={{width:100,height:100 }}/>
        </CoverImage>
        <Box sx={{ ml: 1.5, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Sleep Music
          </Typography>
          <Typography noWrap>
            <b>{name}</b>
          </Typography>
          <Typography noWrap letterSpacing={-0.25}>
          {singer}
          </Typography>
        </Box>
      </Box>
      <input type="range" defaultValue="0" ref={progressBar} onChange={changeRange} />
      <div>{calculateTime(currentTime)}</div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: -2,
        }}
      >
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 3,
        }}
      >
        <IconButton aria-label="previous song" onClick={(e)=>backThirty(5)}>
        <img src={previcon} className='navbaricon' />
        </IconButton>
        <IconButton aria-label="play/pause" onClick={togglePlayPause}>
          <audio ref={audioPlayer}  src={url} preload="metadata" />
          {isPlaying ? <img src={pauseicon} className='navbaricon' /> : <img src={playicon} className='navbaricon' />}
        </IconButton>
        <IconButton aria-label="next song" onClick={(e)=>backThirty(-5)}>
        <img src={nexticon} className='navbaricon' />
        </IconButton>
      </Box>
      <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
        <VolumeDownRounded htmlColor={lightIconColor} />
        <Slider
          aria-label="Volume"
          defaultValue={volume}
          onChange={handleVolumeChange}
          sx={{
            color: theme.palette.mode === 'dark' ? '#9D8189' : '#9D8189',
            '& .MuiSlider-track': {
              border: 'none',
            },
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              backgroundColor: '#9D8189',
              '&:before': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
              },
            },
          }}
        />
        <VolumeUpRounded htmlColor={lightIconColor} />
      </Stack>
    </Widget>
    
  </Box>
  );
}

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100, 
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});
/*    
      */