import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import {styled } from '@mui/material/styles';
import { Typography,Button } from "@mui/material";
import { Container } from "@material-ui/core";
import axios from 'axios';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));

export default function PlansList() {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      fetch(`http://localhost:8000/plan`).then(response =>
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
    axios.delete(`http://localhost:8000/plan/${id}`)
    window.location.reload(true);
  };

  const columns = [
    { field: "plan_id", headerName: "ID", width: 100 },
    {
      field: "plan_name",
      headerName: "Name",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="publicationsListItem">
            <CalendarTodayIcon/>
            {params.row.plan_name}
          </div>
        );
      },
    },
    { field: "plan_type", headerName: "Type", width: 140 },

    {
      field: "",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/plan/" + params.row.plan_id}>
              <button className="publicationsListEdit" onClick={()=>{localStorage.setItem('plan',JSON.stringify(params.row)) }}>Edit</button>
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
        <Typography variant="h4" gutterBottom >
          Plans
        </Typography>
        <CssButton
          variant="contained"
          component={Link}
          to="/newPlan"
          sx={{ backgroundColor: "#F4ACB7", "backgroundColor:hover": "#F4ACB7" }}

        >
          New Plan
        </CssButton>
      </Stack>
      <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row.plan_id}
      /></div>
    </Container>
  );
}
