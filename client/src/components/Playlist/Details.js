import React from "react";

function Details({song,url}) {
  return (
    <div className="c-player--details">
      <div className="details-img">
        <img src={url} alt="" />
      </div>
      <h3 className="details-title">{song.name}</h3>
      <h4 className="details-artist">{song.singer}</h4>
    </div>
  );
}

export default Details;
