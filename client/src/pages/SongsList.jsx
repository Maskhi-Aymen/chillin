import "../assets/styles/songsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import { Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Container } from "@material-ui/core";
import { Typography,Button } from "@mui/material";
import HotelIcon from '@mui/icons-material/Hotel';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import Chip from '@mui/material/Chip';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import axios from 'axios';

export default function SongsList() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      fetch(`http://localhost:8000/song`).then(response =>
        response.json()
      )
        .then(dataM => {
          setIsLoaded(true)
          setData(dataM)
        })
        .catch(err => {
          console.log(err)
        })

    }
  })

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    axios.delete(`http://localhost:8000/song/${id}`)
    window.location.reload(true);
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="songsListsongs">
            <MusicNoteIcon/>
            {params.row.name}
          </div>
        );
      },
    },
    { field: "singer", headerName: "Singer", width: 200 },
    {
      field: "sleep",
      headerName: "Type",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="songsListsongs">
            {(params.row.sleep==true)?  <Chip icon={<HotelIcon />} label="Sleep" variant="outlined" />: <Chip icon={<PlaylistPlayIcon />} label="Playlist" variant="outlined" />}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/song/" + params.row.id}>
              <button className="songsListEdit" onClick={()=>{localStorage.setItem('song',JSON.stringify(params.row)) }}>Edit</button>
            </Link>
            <DeleteOutline
              className="songsListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container className="userList" >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
            <Typography variant="h4" component="h1">Songs</Typography> 
        <CssButton
          variant="contained"
          component={Link}
          to="/newsong"
          sx={{ backgroundColor: "#F4ACB7", "backgroundColor:hover": "#F4ACB7" }}

        >
          New Song
        </CssButton>
      </Stack>
      <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      /></div>
    </Container>
  );
}

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));
