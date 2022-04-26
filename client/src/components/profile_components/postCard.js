import * as React from 'react';
import { styled } from '@mui/material/styles';
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
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import PostOption from './postoption';
import { useEffect } from 'react';
import { CenterFocusStrongOutlined } from '@material-ui/icons';

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

export default function PostCard({ id , type, auteur, url, datepub, description, title ,page}) {
  const [expanded, setExpanded] = React.useState(false);
  const[isLoaded,setIsLoaded]=React.useState(false);
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
  })

  return (
    <Card className='containerPublication' sx={{ borderRadius: '29px' }}>
      <CardHeader
        avatar={
          
          <Avatar src={datas["user_avatar"]} alt={datas["user_name"]} aria-label="recipe"/>
        }
        action={
          <IconButton aria-label="settings">
            <PostOption id={id} page={page}/>
          </IconButton>
        }
        title={datas["user_name"]+" "+datas["user_Lastname"]}
        subheader={datepub}
      />
      {(type == "video") ? <iframe width="550" height="300" src={"https://www.youtube.com/embed/"+urlyoutube} ></iframe> : <></>}
      {(type == "image") ? <CardMedia component="img" height="400" width="300" image={url} alt={type} /> : <></>}
      {(type == "text") ? <Typography variant="body2" color="text.secondary">{description}</Typography> : <></>}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {(description === "" ) ?   <></>:
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>}
      </CardActions>
      {( type ==='text') ?   <></>:
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>}
    </Card>
  );
}
