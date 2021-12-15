import React, {useState, useEffect} from 'react';
import {Link, useRouteMatch} from "react-router-dom";
import { useHttpHook } from '../../Hooks/api.hook';

function UserFilmItem({filmWatching, userId}) {
    const [filmWatched, setFilmWatched]=useState();
    const { api } = useHttpHook();
    let { url } = useRouteMatch();

    const fetchWatchedFilm = async ()=>{
        try {
            const result = await api.get(`films/${filmWatching._id}`);
            
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
        if(filmWatching) fetchWatchedFilm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div>
            {!!filmWatched && 
              <div className='film-stat-item'>
                <h4> Фильм: {filmWatched.name} </h4>
                <p> Просмотров : {filmWatching.viewsNumber}</p>
                {/* <Link to={`${ url }/statistics-film/${filmWatched._id}`}> */}
                <Link to={`/admin/statistics-film/${filmWatched._id}/${userId}`}>
                  <button> Подробнее </button>
                </Link>
              </div>}
        </div>
    );
}

export default UserFilmItem;