import React, { useState } from 'react';
import YouTube from 'react-youtube';
import {PATHTO} from '../../constants/constants'

function FilmPlayer({videoUrl, filmId, userId}) {
    const [playBackDuration, setPlayBackDuration] = useState(0);
    const [isWatched, setIsWatched] = useState(false);
    
    const urlArray = videoUrl.split("/");
    const videoId = urlArray[urlArray.length-1];
    const opts={
        height: '300',
        width: '500',
    };

    const fetchWatching = async() => {
        const b = new FormData();
       b.append('userId',userId);
       b.append('filmId',filmId);
        console.log('FilmPlayer.', [...b]);
        try {
            const response = await fetch(`${ PATHTO.HOST_NAME }/watching`, {
              method: 'POST',
              body: b,
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
    }
    
    function _onStateChange (e){
        if(!isWatched){
            const currentTime = e.target.getCurrentTime()
            const duration = currentTime - playBackDuration;

            console.log('FilmPlayer', e.target.getPlayerState());
            
            if(duration > 10 ) {
                setIsWatched(true);
                fetchWatching();
                // save wastching to database
                return;
            }
            setPlayBackDuration(currentTime);
        }
    }
    return (
        <div>
           return <YouTube videoId={videoId} opts={opts} onStateChange={_onStateChange}  />;
        </div>
    );
}

export default FilmPlayer;