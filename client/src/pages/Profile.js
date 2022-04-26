import React from 'react';
// import logo from './logo.svg';
import { useEffect,useState } from 'react';
import Header from '../components/profile_components/header.jsx'
import PhotoProfile from '../components/profile_components/photoProfile.js';
import LabTabs from '../components/profile_components/LabTab';

function Profile() {
  const [datas,setdatas]=useState([]);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    if(!isLoaded){
      const user=localStorage.getItem('user')
     fetch(`http://localhost:8000/getuser/${user}`).then(response=>
       response.json()
       )
     .then(data=>{
       setIsLoaded(true)
       setdatas(data)
       })
     .catch(err=>{
       console.log(err)
     })
    
   }
  })
  return (
    <div className='yellocard'>
      <Header text ="Profile Page"/>
      <hr />
      <PhotoProfile name={datas["user_name"]} Lname={datas["user_Lastname"]} photo={datas["user_avatar"]} /> 
      <br />
     <LabTabs id={datas["user_id"]}/>
  

    </div>
  );
}

export default Profile;
/*import AddPub from '../components/content/AddPub';
<AddPub/>
*/