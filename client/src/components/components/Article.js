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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rating from '@mui/material/Rating';


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

export default function Article({ type, auteur, url, image, datepub, avatar, description, moreinfo }) {
  const [expanded, setExpanded] = React.useState(false);
  const urlyoutube=url.substring(17);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className='containerPublication' sx={{ borderRadius: '29px' }}>
      <CardHeader
        avatar={
          <Avatar  src={avatar} aria-label="recipe"/>
        }
        title={auteur}
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
