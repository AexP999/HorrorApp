import React,{ useState, useEffect } from 'react';
import {useHistory, useParams} from "react-router-dom";
import { useHttpHook } from '../../Hooks/api.hook';

function UserFilmStatistics(props) {
    const history = useHistory();
    const { api } = useHttpHook();

    const {filmId, userId} = useParams();
    const [allWatchings, setAllWatchings] = useState();
    const [filmWatched, setFilmWatched] = useState();

    const fetchAllWatchings = async ()=>{
        try {
            const result = await api.get(`watching/${filmId}/${userId}`);
            if(!result) {
              throw new Error(result.message || 'Где-то ошибка');
            }
            setAllWatchings(result.data);
      
          } catch(err) {
            console.log(err);
          };
    }

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
        if(!allWatchings) 
            fetchAllWatchings();
        if(!filmWatched) 
            fetchWatchedFilm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getYear = (str)=> {
        let tmpStr = str.substring(0,10);
        return tmpStr.split("-").reverse().join("-");
    }
    const getTime = (str)=> {
        return str.substring(11,16);
    }
    
    return (
        <div>
            { !!filmWatched && !!allWatchings &&
                <div>  
                <h4> Пользователь {userId} </h4>
                <p>  Смотрел {filmWatched.name} - {allWatchings.length} раз.</p>
                </div>
            }
            <hr/>
            {!!allWatchings && 
                allWatchings.map((item, index)=>
                <div key={index}>
                        <p> {getYear(item.createdAt)} в {getTime(item.createdAt)}</p>
                    </div>
                )
            }
            <hr/>
            <button onClick={ () => history.go(-1) }>
              назад
            </button>
        </div>
    );
}

export default UserFilmStatistics;