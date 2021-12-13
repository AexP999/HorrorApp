import React, {useState, useEffect} from 'react';
import { useHttpHook } from '../../Hooks/api.hook';

function UserFilmItem({filmId}) {
    const [filmWatched, setFilmWatched]=useState();
    const { api } = useHttpHook();

    const fetchWatchedFilm = async ()=>{
        try {
            const result = await api.get(`films/${filmId}`);
            
            setFilmWatched(result.data);
            if(!result) {
              throw new Error(result.message || 'Где-то ошибка');
            }
            return result.data;
        
          } catch(err) {
            console.log(err);
          };
    }
    useEffect(()=>{
        console.log(filmId);
        if(filmId) fetchWatchedFilm();
    },[]);

    return (
        <div>
            {!!filmWatched && <div>{filmWatched.name}</div>}
        </div>
    );
}

export default UserFilmItem;