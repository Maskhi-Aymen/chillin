import "../assets/styles/publicationsList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Typography,Button } from "@mui/material";
import SegmentIcon from '@mui/icons-material/Segment';
import PhotoIcon from '@mui/icons-material/Photo';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import { Container } from "@mui/material"; 
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PublicIcon from '@mui/icons-material/Public';

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));

export default function PublicationsList() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      fetch(`http://localhost:8000/publication`).then(response =>
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
    axios.delete(`http://localhost:8000/publication/${id}`)
    window.location.reload(true);
  };

  const columns = [
    { field: "pub_id", headerName: "ID", width: 100 },
    {
      field: "pub_author",
      headerName: "Author",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="publicationsListItem">
            {(params.row.pub_type === "text") ? <SegmentIcon /> : <></>}
            {(params.row.pub_type === "video") ? <OndemandVideoIcon /> : <></>}
            {(params.row.pub_type === "image") ? <PhotoIcon /> : <></>}
            {params.row.pub_author}
          </div>
        );
      },
    },
    {
      field: "published",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="publicationsListItem">
            {(params.row.published === true) ? <Chip label="Published" sx={{backgroundColor:'#F4ACB7' }} variant="outlined" /> : <Chip label=" Not Published" sx={{backgroundColor:'#9D8189' }} variant="outlined" />}
          </div>
        );
      },
    },
    { field: "pub_date", headerName: "Date", width: 140 },
    {
      field: "pub_title",
      headerName: "Title",
      width: 160,
    },    {
      field: "private",
      headerName: "Private",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="publicationsListItem">
            {(params.row.private) ? <AdminPanelSettingsIcon /> : <PublicIcon/>}
          </div>
        );
      },
    },

    {
      field: "",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/publication/" + params.row.pub_id}>
              <button className="publicationsListEdit"  onClick={()=>{localStorage.setItem('pubSelected',JSON.stringify(params.row));localStorage.setItem('pub_author',params.row.pub_author) }}>Edit</button>
            </Link>
            <DeleteOutline
              className="publicationsListDelete"
              onClick={() => handleDelete(params.row.pub_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container className="userList" >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
          <Typography variant="h4" component="h1"> Publications</Typography>
        <CssButton
          variant="contained"
          component={Link}
          to="/newpublication"
          sx={{ backgroundColor: "#F4ACB7", "backgroundColor:hover": "#F4ACB7" }}

        >
          New Pub
        </CssButton>
      </Stack>
      <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row.pub_id}
      /></div>
    </Container>
  );
}
