import * as React from 'react';
import { useState, useRef } from 'react';
import { IconButton } from '@material-ui/core';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import PlayCircleFilledWhiteSharpIcon from '@mui/icons-material/PlayCircleFilledWhiteSharp';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MeditateWindow({ img, song }) {
  const [open, setOpen] = React.useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayer = useRef();
  const animationRef = useRef();
  const theme = useTheme();
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  const handleClickOpen = () => {
    setOpen(true);
  };
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
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button size="large" color="primary" sx={{ display: "flex", margin: "auto", borderRadius: 220 }} onClick={handleClickOpen}>
        <PlayCircleFilledWhiteSharpIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Let's start!"}<Button onClick={handleClose} sx={{ float: 'right', marginTop: 40 }} ><CloseIcon /></Button></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <img src={img} className="meditate-img"></img>

          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ margin: 'auto' }}>
          <IconButton aria-label="play/pause" onClick={togglePlayPause}  >
            <audio ref={audioPlayer} src={song} preload="metadata" />
            {isPlaying ? <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} /> : <PlayArrowRounded
              sx={{ fontSize: '3rem' }}
              htmlColor={mainIconColor}
            />}

          </IconButton>

        </DialogActions>
      </Dialog>
    </div>
  );
}
