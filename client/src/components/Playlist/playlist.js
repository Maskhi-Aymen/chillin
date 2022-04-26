import { useState, useEffect } from "react";
import React from "react";
import Player from "./Player";
import './playliste.css';
import axios from 'axios';

function PlayList({PLid,PLname,PLimg}) {
  const [songs,setsongs] = useState([{"name":"","url":"","singer":""}]);
  const [isLoaded,setIsLoaded]=useState(false);
  
  useEffect(()=>{
    if(!isLoaded){
      fetch(`http://127.0.0.1:8000/playlistsong/${PLid}`).then(response=>
        response.json()
        )
      .then(data=>{
        setIsLoaded(true)
        setsongs(data)
        console.log(data)
        })
      .catch(err=>{
        console.log(err)
      })
    }
  },[])
  
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex, songs.length]);

  return (
    <div className="playlist">
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
        imgsrc={PLimg}
      />
    </div>
  );
} 

export default PlayList;
