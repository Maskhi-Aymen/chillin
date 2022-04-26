import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import { Stack } from "@mui/material";
import { Container } from "@material-ui/core";
import { Typography,Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from 'axios';

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));


export default function PlayList_list() {
  const [data, setData] = useState([]);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    if(!isLoaded){
     fetch(`http://localhost:8000/playlist`).then(response=>
       response.json()
       )
     .then(dataM=>{
       setIsLoaded(true)
       setData(dataM)
       })
     .catch(err=>{
       console.log(err)
     })
    
   }},[])
 
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    axios.delete(`http://localhost:8000/playlist/${id}`)
    window.location.reload(true);
  };

  const columns = [
    { field: "pl_id", headerName: "ID", width: 100 },
    {
      field: "pl_name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="publicationsListItem">
            <img className="userListImg" src={params.row.pl_imgurl} alt="" />
            {params.row.pl_name}
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
            <Link to={"/playlist/" + params.row.pl_id}>
              <button className="suggestionsListEdit" onClick={()=>{localStorage.setItem('playlistselected',JSON.stringify(params.row)) }}>Edit</button>
            </Link>
            <DeleteOutline
              className="suggestionsListDelete"
              onClick={() => handleDelete(params.row.pl_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container className="userList" >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
      <Typography variant="h4" component="h1">PlayLists</Typography>
        <CssButton
          variant="contained"
          component={Link}
          to="/newplaylist"
          sx={{ backgroundColor: "#F4ACB7", "backgroundColor:hover": "#F4ACB7" }}

        >
          New Playlist
        </CssButton>
      </Stack>
      <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row.pl_id}
      /></div>
    </Container>
  );
}
