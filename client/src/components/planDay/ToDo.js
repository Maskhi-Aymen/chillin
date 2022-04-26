import React, { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import early_morning from '../../assets/images/early_morning.png';
import night from '../../assets/images/night.png';
import morning from '../../assets/images/morning.png';
import sun from '../../assets/images/sun_set.png';
import early_night from '../../assets/images/early_night.png';
import evening from '../../assets/images/evening.png';

const Todo = ({ id, label, date, duration, title, description, time }) => {


  return (
    <Card sx={{ Width: "99%", Height: 250, borderRadius: 2, border: '1px #9D8189 solid', }} className="todo-row">
      {
        (label === "Early Morning") ? <CardMedia
          component="img"
          sx={{ width: "20%" }}
          image={early_morning}
          alt="Live from space album cover"
        /> : <></>
      }
            {
        (label === "Morning") ? <CardMedia
          component="img"
          sx={{ width: "20%" }}
          image={morning}
          alt="Live from space album cover"
        /> : <></>
      }
      {
        (label === "Noonday") ? <CardMedia
          component="img"
          sx={{ width: "20%" }}
          image={sun}
          alt="Live from space album cover"
        /> : <></>
      }
            {
        (label === "Early Night") ? <CardMedia
          component="img"
          sx={{ width: "20%"}}
          image={early_night}
          alt="Live from space album cover"
        /> : <></>
      }
      {
        (label === "Evening") ? <CardMedia
          component="img"
          sx={{ width: "20%" }}
          image={night}
          alt="Live from space album cover"
        /> : <></>
      }

      <CardContent sx={{}}>
        <Typography variant="subtitle1" component="div" className='titlesoustitre'>
          {description}
        </Typography>
        <Typography component="div" variant="h2" className='titlePlan'>
          {title}
        </Typography>

      </CardContent>
      <Box sx={{}}>
        <Typography component="div" variant="h5" className='titlesoustitre'>
          {time}
        </Typography>
        <Box sx={{ alignItems: 'center', pl: 1, pb: 1 }}>
          <Typography component="div" variant="h5" className='titlePlan'>
            {duration}
          </Typography>
        </Box>
      </Box>

    </Card>
  );
};

export default Todo;


/**
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

 */