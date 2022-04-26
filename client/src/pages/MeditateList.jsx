import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { Container } from "@material-ui/core";
import { Typography,Button } from "@mui/material";
import axios from "axios";

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));
export default function MeditateList() {
  const [data, setData] = useState([]);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    if(!isLoaded){
     fetch(`http://localhost:8000/meditate`).then(response=>
       response.json()
       )
     .then(dataM=>{
       setIsLoaded(true)
       setData(dataM)
       console.log(dataM)
       })
     .catch(err=>{
       console.log(err)
     })
    
   }})

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    axios.delete(`http://localhost:8000/meditate/${id}`)
    window.location.reload(true);
  };

  const columns = [
    { field: "med_id", headerName: "ID", width: 100 },
    {
      field: "med_name",
      headerName: "Name",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.med_imgurl} alt="" />
            {params.row.med_name}
          </div>
        );
      },
    },
    { field: "med_description", headerName: "Description", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/meditate/" + params.row.med_id}>
              <button className="userListEdit" onClick={()=>{localStorage.setItem('meditateSelected',JSON.stringify(params.row))}} >Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.med_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container className="userList" >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
        <Typography variant="h4" gutterBottom >
          Meditate
        </Typography>
        <CssButton
          variant="contained"
          component={RouterLink}
          to="/newmeditate"
          sx={{backgroundColor:"#F4ACB7","backgroundColor:hover":"#F4ACB7"}}
         
        >
          New 
        </CssButton>
      </Stack>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          getRowId={(row) => row.med_name }
          columns={columns}
          pageSize={4}
          checkboxSelection
          className="userList"
          {...data}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
        /></div>
    </Container>
  );
}
