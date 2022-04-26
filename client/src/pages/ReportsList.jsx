import "../assets/styles/reportsList.css";
import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportsList() {
  const [data, setData] = useState([]);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    if(!isLoaded){
     fetch(`http://localhost:8000/reports`).then(response=>
       response.json()
       )
     .then(dataM=>{
       setIsLoaded(true)
       setData(dataM)
       })
     .catch(err=>{
       console.log(err)
     })
    
   }

  })
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/reports/${id}`)
    window.location.reload(true);
  };

  const columns = [
    { field: "report_id", headerName: "ID", width: 100 },
    {
      field: "report_author",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="reportsListItem">
            <img className="reportsListImg" src={params.row.img} alt="" />
            {params.row.report_author}
          </div>
        );
      },
    },
    { field: "report_pub", headerName: "ID Publication", width: 200},
    { field: "report_message", headerName: "Message", width: 534 },
    {
      field: "",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="reportsListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="reportsList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row) => row.report_id}
      />
    </div>
  );
}
