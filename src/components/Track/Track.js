import React from 'react';
import './Track.css'


const Track = (props) => {
    return(
        <div className="track">
            <div className="album-cover">
                <img src={props.albumCover} />
            </div>
            <div className="track-info">
                <h3>{props.title}</h3>
                <p>{props.albumTitle}</p>
                <audio controls src={props.preview}>
                </audio>
            </div>
        </div>
    )
}

export default Track;