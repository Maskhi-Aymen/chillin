import "../assets/styles/userList.css";
import { Link as RouterLink } from 'react-router-dom';
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { alpha, styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { Container } from "@material-ui/core";
import { Typography,Button } from "@mui/material";
import React from "react";
import axios from "axios";

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));
export default function UserList() {
  const [data, setData] = useState([]);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    if(!isLoaded){
     fetch(`http://localhost:8000/user`).then(response=>
       response.json()
       )
     .then(dataM=>{
       setIsLoaded(true)
       setData(dataM)
       })
     .catch(err=>{
       console.log(err)
     })
    
   }})

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    axios.delete(`http://localhost:8000/user/${id}`)
    window.location.reload(true);
  };

  const columns = [
    { field: "user_id", headerName: "ID", width: 100 },
    {
      field: "user",
      headerName: "User",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.user_avatar} alt="" />
            {params.row.user_name}{" "}{params.row.user_Lastname}
          </div>
        );
      },
    },
    { field: "user_mail", headerName: "Email", width: 200 },
    {
      field: "user_name",
      headerName: "Name",
      width: 130,
    },
    {
      field: "user_Lastname",
      headerName: "Last Name",
      width: 150,
    },   
     {
      field: "user_dateOfJoin",
      headerName: "Date of join",
      width: 140,
    },
    {
      field: "admin",
      headerName: "Admin",
      width: 140,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.user_id}>
              <button className="userListEdit" onClick={()=>{localStorage.setItem('userSelected',JSON.stringify(params.row))}} >Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container className="userList">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} >
      <Typography variant="h4" component="h1">Users</Typography>
        <CssButton
          variant="contained"
          component={RouterLink}
          to="/newuser"
          sx={{backgroundColor:"#F4ACB7","backgroundColor:hover":"#F4ACB7"}}
         
        >
          New User
        </CssButton>
      </Stack>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
          className="userList"
          getRowId={(row) => row.user_id}
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
