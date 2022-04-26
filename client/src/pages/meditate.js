import * as React from 'react';
import WelcomePlan from '../components/meditate/MeditateCarde';
import '../assets/styles/welcomePlan.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect,useState } from 'react';
import ReactLoading from "react-loading";
const theme = createTheme({
  status: {
    danger: '#fffff',
  },
  palette: {
    primary: {
      main: '#9D8189',
      darker: '#053e85',
    },
    neutral: {
      main: '#F4ACB7',
      contrastText: '#f4acb7d3',
    },
  },
});
export default function Meditate() {
  const [datamd,setdatamd]=useState([]);
  const [isLoaded,setIsLoaded]=useState(false);

  useEffect(()=>{
    if(!isLoaded){
     fetch("http://localhost:8000/meditate").then(response=>
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
  <ThemeProvider theme={theme}>
  <div >
     
     {isLoaded ? (<div className='containerPlan'>
      {datamd.filter((val) => {
    return val.med_name.toLowerCase();
}).map((val, key) => {
    return (<div key='val.med_id' >
        
     <WelcomePlan title={val.med_name} intro={val.med_description} img={val.med_imgurl} song={val.med_songurl}  />
    </div>)
})}</div>):<ReactLoading
                  height={"150px"}
                  width={"150px"}
                  color={"#FFCAD4"}
                  className="loading"
                  type="bars"
             
                /> }



    </div></ThemeProvider>
  );
}
