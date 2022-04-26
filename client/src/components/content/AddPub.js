import {
    Button,
    Container,
    Fab,
    FormControlLabel,
    FormLabel,
    makeStyles,
    MenuItem,
    Modal,
    Radio,
    RadioGroup,
    Snackbar,
    TextField,
    Tooltip,
  } from "@material-ui/core";
  import React from "react";
  import { Add as AddIcon } from "@material-ui/icons";
  import { useState } from "react";
  import MuiAlert from "@material-ui/lab/Alert";
  import Select, { SelectChangeEvent } from '@mui/material/Select';
  import InputLabel from '@mui/material/InputLabel';
  import axios from 'axios';
  
  const useStyles = makeStyles((theme) => ({
    fab: {
      position: "fixed",
      bottom: 20,
      right: 20,
      backgroundColor:'#F4ACB7'
    },
    container: {
      width: 500,
      height: 550,
      backgroundColor: "white",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
        height: "100vh",
      },
    },
    form: {
      padding: theme.spacing(2),
    },
    item: {
      marginBottom: theme.spacing(3),
    },
  }));
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const AddPub = () => {
    const classes = useStyles();
    const [value, setValue] = useState('text');
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [isposted, setisposted] = useState(false);
    const [reponse, setreponse] = useState('');
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenAlert(false);
    };
    const [share, setshare] = useState('False');
    const handleChange = (event: SelectChangeEvent) => {
        setshare(event.target.value );
      };

      const handleAffiche = () => {
         setOpen(false)
        setOpenAlert(true)
      };
      const postdata = async ()=>{
        if(!isposted){
        fetch('http://127.0.0.1:8000/publication',{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },body: JSON.stringify(
        {
          "pub_type":value,
          "pub_title":document.getElementById("title").value,
          "pub_description":document.getElementById("description").value,
          "pub_url":document.getElementById("url").value,
          "pub_author":localStorage.getItem('user'),
          "private":share
        })
       }).then((resp)=>resp.json()).then((data) => {
        setreponse(data)    
        setisposted(true)
        handleAffiche()
        setTimeout(() => window.location.reload(), 2000);
       })

     }
      }
      const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((event.target ).value);
      };

    return (
      <>
        <Tooltip title="Add" aria-label="add"  onClick={() => setOpen(true)}>
          <Fab  className={classes.fab} sx={{zindex:1 }}>
            <AddIcon sx={{ }}/>
          </Fab>
        </Tooltip>
        <Modal open={open}>
          <Container className={classes.container}>
            <form className={classes.form} autoComplete="off">
              <div className={classes.item}>
                <TextField
                  id="title"
                  label="Title"
                  size="small"
                  style={{ width: "100%" }}
                />
              </div>
              <div className={classes.item}>
                <TextField
                  id="description"
                  multiline
                  rows={4}
                  defaultValue="Tell your story..."
                  variant="outlined"
                  label="Description"
                  size="small"
                  style={{ width: "100%" }}
                />
              </div>
              <div className={classes.item}>
              <InputLabel id="demo-simple-select-standard-label">Share</InputLabel>

              <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select"
          value={share}
          label="share"
          onChange={handleChange}
        >
                  <MenuItem value="False">Public</MenuItem>
                  <MenuItem value="True">Private</MenuItem>
                </Select>
              </div>
              <div className={classes.item}>
                <FormLabel component="legend">Do you want to Share :</FormLabel>
                <RadioGroup
                                   value={value}
                                   onChange={handleRadioChange}
                          >
                   <FormControlLabel
                    value="text"
                    control={<Radio size="small" />}
                    label="Text"
                  />
                  <FormControlLabel
                    value="image"
                    control={<Radio size="small" />}
                    label="Photo"
                  />
                  <FormControlLabel
                    value="video"
                    control={<Radio size="small" />}
                    label="Vedio"
                  />
                </RadioGroup>
                <TextField
                  id="url"
                  label="URL"
                  size="small"
                  style={{ width: "100%" }}
                />
              </div>
              <div className={classes.item}>
                <Button
                  variant="outlined"
                  sx={{}}
                  style={{ marginRight: 20, backgroundColor:"#F4ACB7"}}
                  onClick={postdata}
                >
                  Create
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Container>
        </Modal>
        <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleClose} 
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleClose} style={{ backgroundColor:"#F4ACB7"}}>
            {reponse}
          </Alert>
        </Snackbar>
      </>
    );
  };
  
  export default AddPub;
  /**
   *  const postdata = async ()=>{
        const url="";
        if(!isposted){
          if(value!=='text'){url= document.getElementById("url").value}
        const res = axios.post('http://127.0.0.1:8000/publication',
        {
          "pub_type":value,
          "pub_title":document.getElementById("title").value,
          "pub_description":document.getElementById("description").value,
          "pub_url":url,
          "pub_author":localStorage.getItem('user'),
          "private":share
        }
        ).then((resp)=>resp.json())
        setreponse(res.data)  
        console.log(reponse,'rep')
        console.log(res)  
        setisposted(true)
        handleAffiche()
        

}
   */