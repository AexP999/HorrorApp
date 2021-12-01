import React, { useState } from 'react';
import YouTube from 'react-youtube';
import {PATHTO} from '../../constants/constants'
import './FilmsCard.css'

function FilmPlayer ({ videoUrl, filmId, userId }) {
    const [ playBackDuration, setPlayBackDuration ] = useState(0);
    const [ isWatched, setIsWatched ] = useState(false);

    const urlArray = videoUrl.split("/");
    const videoId = urlArray[urlArray.length-1];
    const opts={
        height: '480',
        width: '640',
    };

    const fetchWatching = async() => {
    
        try {
            const response = await fetch(`${ PATHTO.HOST_NAME }/watching`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({
                userId: userId,
                filmId: filmId,
              }),
            });
            const result = await response.json();
            if(result.hasOwnProperty("customCode"))
                // пришла ошибка
                console.log('fetchWatching error', result.message);
            else
                console.log('fetchWatching success', result);
        } catch(error) {
            console.log('Ошибка загрузки редактированного фильма', error);
        }
    };

    function _onStateChange (e) {
        if(!isWatched) {
            const currentTime = e.target.getCurrentTime();
            const duration = currentTime - playBackDuration;

            console.log('FilmPlayer', e.target.getPlayerState());

            if(duration > 10) {
                setIsWatched(true);
                fetchWatching();
                // save wastching to database
                return;
            }
            setPlayBackDuration(currentTime);
        }
    }
    return (
        // <div>
        <div className='video-container'>
           <YouTube videoId={videoId} opts={opts} onStateChange={_onStateChange}  />;
        </div>
    );
}

export default FilmPlayer;