import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';
import MusicCard from '../player/cardplayer';
import PublicationOption from './PublicationOption';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
      color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
      color: '#ff3d47',
  },
});
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Article({id, type, auteur, url, datepub, reaction, description, moreinfo}) {
  const [expanded, setExpanded] = React.useState(false);
  const[isLoaded,setIsLoaded]=React.useState(false);
  const user= localStorage.getItem('user');
  const[value,setvalue]=useState(reaction)
  const[datas,setdatas]=React.useState([]);
  const urlyoutube=url.substring(17);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(()=>{
    if(!isLoaded){
     fetch(`http://localhost:8000/getuser/${auteur}`).then(response=>
       response.json()
       )
     .then(data=>{
       setIsLoaded(true)
       setdatas(data)
       })
     .catch(err=>{
       console.log(err)
     })
    
   }
  },[])

  const postdata = (e) =>{
      e.preventDefault();
      setvalue(1-value)
      fetch(`http://127.0.0.1:8000/reactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "user":user,
          "pub_id": id
        }),
      })
        .then((res) => res.json())
        .then((data) => {
         
        })
        .catch((err) => {
          console.log(err);
        });
    
    
    
   
   
	}
  return (
    <Card className='containerPublication' sx={{ borderRadius: '29px' }}>
      <CardHeader
        avatar={
          <Avatar src={datas["user_avatar"]} alt={datas["user_name"]} aria-label="recipe"/>
        }
        action={
          <IconButton aria-label="settings">
            <PublicationOption pubId={id}/>
          </IconButton>
        }
        title={datas["user_name"]+" "+datas["user_Lastname"]}
        subheader={datepub}
      />
      {(type == "video") ? <iframe width="550" height="400" src={"https://www.youtube.com/embed/"+urlyoutube}></iframe> : <></>}
      {(type == "image") ? <CardMedia component="img" height="400" width="300" image={url} alt={type} /> : <></>}
      {(type == "text") ? <Typography variant="body2" color="text.secondary">{moreinfo}</Typography> : <></>}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={postdata} sx={{marginLeft:5}}>

        <StyledRating
          name="customized-color"
          value={value}
          precision={1} max={1} 
          icon={<FavoriteIcon fontSize="inherit" sx={{width:50,height:50}} />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" sx={{width:50 ,height:50}} />}
        /> 
      
      </Button>
        {(moreinfo === "") ?   <></>:
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>}
      </CardActions>
      {(moreinfo === "") ?   <></>:
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {moreinfo}
          </Typography>
        </CardContent>
      </Collapse>}
    </Card>
  );
}
/**
 * const postdata = (e) =>{
    alert("dd")
		fetch("http://127.0.0.1:8000/reactions", JSON.stringify(
      {
        "user":3,
        "pub_id": id
      }
    ),{
       headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer "
       }
     })
     .then((json) => {
  
     })
     .catch((err) => console.log(err));
    setvalue(1)
    
   
   
	}
 */