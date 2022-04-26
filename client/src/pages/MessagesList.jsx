import "../assets/styles/messagesList.css";
import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { useState,useEffect } from "react";
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

export default function MessagesList() {
  const [data, setData] = useState([]);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    if(!isLoaded){
     fetch(`http://localhost:8000/messages`).then(response=>
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

  },[])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/messages/${id}`)
    window.location.reload(true);
  };

  const columns = [
 
    { field: "message_id",type: 'number', headerName: "ID", width: 94 },
    {
      field: "message_user",
      headerName: "Sender",
      type: 'number',
      width: 140,
      renderCell: (params) => {
        return (
          <div className="messagesListItem">
            <EmailIcon/>
            {params.row.message_user}
          </div>
        );
      },
    },
    { field: "message_date", headerName: "Date", width: 200 },
    { field: "message_content", headerName: "Message", width: 600 },
    
    {
      field: "",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="messagesListDelete"
              onClick={() => handleDelete(params.row.message_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="messagesList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(row) => row.message_id}
      />
    </div>
  );
}
/**<img className="messagesListImg" src={params.row.img} alt="" />*/