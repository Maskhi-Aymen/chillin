import React, { useState, useRef, useEffect } from "react";
import Controls from "./Controls";
import Details from "./Details";

function Player({songs,currentSongIndex,setCurrentSongIndex,nextSongIndex,imgsrc}) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = songs.length - 1;
        }

        return temp;
      });
    }
  };

  return (
    <div className="c-player">
      <h4>Playing now</h4>
      <Details song={songs[currentSongIndex]} url={imgsrc} />
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        SkipSong={SkipSong}
      />
      <audio
        className="c-player--audio"
        src={songs[currentSongIndex].url}
        ref={audioEl}
        controls
      ></audio>
      <p>
        Next up:{" "}
        <span>
          {songs[nextSongIndex].name} by{" "}
          {songs[nextSongIndex].singer}
        </span>
      </p>
    </div>
  );
}

export default Player;
