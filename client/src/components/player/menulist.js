import * as React from 'react';
import { useState,useEffect } from 'react';
import MusicCard from './cardplayer';
import ReactLoading from 'react-loading';


export default function MusicList({ handleSong }) {
    const [data,setdata]=useState([]);
    const [isLoaded,setIsLoaded]=useState(false);
  
    useEffect(()=>{
      if(!isLoaded){
       fetch("http://localhost:8000/song").then(response=>
         response.json()
         )
       .then(dataS=>{
         setIsLoaded(true)
         setdata(dataS)
         })
       .catch(err=>{
         console.log(err)
       })
       
     }
    })
    const [dense, setDense] = React.useState(false);

    return (
        <div >
            

            {isLoaded ? (<div className='containerMusic'>

                {data.filter((val) => {
                    return val.sleep;
                }).map((val, key) => {
                    return (<div key={val.id} > 
                        <MusicCard singer={val.singer} name={val.name} url={val.url}  />


                    </div>)
                })}</div>):<ReactLoading
                  height={"150px"}
                  width={"150px"}
                  color={"#FFCAD4"}
                  className="loading"
                  type="bars"
             
                /> }
            </div>
    );
}
