import React, { useState, useEffect } from 'react';
import Todo from '../components/planDay/ToDo';
import '../assets/styles/Todo.css';
import dayjs from 'dayjs';
import ReactLoading from 'react-loading';


function TodoList() {
  const [datamd,setdatamd]=useState([]);
  const [isLoaded,setIsLoaded]=useState(false);
  const user = JSON.parse(localStorage.getItem('userinfo'))
  const usertype=user['user_type'];

  useEffect(()=>{
    if(!isLoaded){
     fetch("http://localhost:8000/planactivity",{
      method: "OPTIONS",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_name: usertype
      }),
    }).then(response=>
       response.json()
       )
     .then(data=>{
       setIsLoaded(true)
       setdatamd(data)
       })
     .catch(err=>{
       console.log(err)
     })
     
   }
  })
  return (
   <div className='yellocard'>
      <h1>What's the Plan for Today?</h1>
      {isLoaded? (<>
                      {datamd.filter((val) => {
                    return val.activity_date==dayjs(new Date()).format("YYYY-MM-DD");
                }).map((val, key) => {
                    return (<div key='val.id' >
                        <Todo
                        id={val.activity_id}
                        label={val.label}
                        date={val.activity_date}
                        time={val.activity_time}
                        title={val.activity_name}
                        description={val.activity_type}
                        duration={val.activity_duration}
                        
                        />


                    </div>)
                })}</>):<ReactLoading
                  height={"150px"}
                  width={"150px"}
                  color={"#FFCAD4"}
                  className="loading"
                  type="bars"
             
                />}
      </div>
    
  );
}

export default TodoList;
