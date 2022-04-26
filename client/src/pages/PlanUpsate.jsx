import * as React from 'react';
import Button from '@mui/material/Button';
import {  useState,useRef } from "react";
import {  styled } from '@mui/material/styles';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import CreateEventModal from '../components/plan/CreateEventModal'
import UpdateEvent from "../components/plan/UpdateEvent";
import dayjs from "dayjs";

function Plan() {
const plan =JSON.parse(localStorage.getItem("plan"))  
const [updateopen,setupdateopen]=useState(false)
const[modelopen,setmodelopen]=useState(false)
const[event,setevent]=useState([]);
const [events,setevents]=useState([])
let lis=[]
async function handleDatesSet(data)
{
 await fetch(`http://localhost:8000/planactivity/${plan['plan_id']}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }}) .then((res) => res.json()) .then((data) => {

      for (let i = 0; i < data.length; i++) {
  let tt={}
  tt["id"]=data[i].activity_id;
   tt["title"]=data[i].activity_name;
   tt["start"]= dayjs(data[i].activity_date).format("YYYY-MM-DD")+" "+data[i].activity_time+":00";
   tt["end"]= dayjs(data[i].activity_date).format("YYYY-MM-DD")+" "+data[i].activity_time+":30";
   tt["color"]="#F4ACB7"
   lis.push(tt)
}
setevents(lis)
  })

}

const calendarRef=useRef(null);
const onEventAdded =(event)=>{
  let calendarApi = calendarRef.current.getApi()
  calendarApi.refetchEvents()
}
const deleteEvent = (id) => {
  for (let i = 0; i < events.length; i++) {
    if (events[i].id == id) { setevents(events.splice(events[i], events.length-1)) }
  }
};

const handleDateClick = (arg) => { // bind with an arrow function
  setevent(arg.event) 
  setupdateopen(true)
}
  return (
    <div className="userList">
         <CssButton variant="outlined" onClick={()=>setmodelopen(true)}>
      Create
      </CssButton>
      <UpdateEvent isopen={updateopen} Onclose={()=>setupdateopen(false)}  event={event} removeEvent={i=>deleteEvent(i)} />
      <CreateEventModal isopen={modelopen} Onclose={()=>setmodelopen(false)} onEventAdded={e=>onEventAdded()} />
  <FullCalendar
        ref={calendarRef}
        events={events}
        plugins={[ dayGridPlugin, interactionPlugin ]}
        themeSystem={'journal'}
        initialView='dayGridMonth'
        datesSet={(date)=> handleDatesSet(date)}
        eventClick={(arg)=>handleDateClick(arg)}
        default= 'journal'
        
      />
    </div>
  );

}
const CssButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#F4ACB7'),
  backgroundColor:'#F4ACB7' ,
  color:'#ffff',
  '&:hover': {
    backgroundColor: '#F4ACB7',
  },
}));

export default Plan