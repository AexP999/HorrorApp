/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { useHttpHook } from '../../Hooks/api.hook';
import UserFilmItem from './UserFilmItem';
import './Statistic.css'


function UserStatInfo(props) {
    const {userId} = useParams();
    const history = useHistory();
    const { api } = useHttpHook();
    const [ user, setUser ] = useState([]);
    const [watchings, setWatchings]=useState([]);

    const fetchUser = async ()=>{
        try {
            const result = await api.get(`auth/users/${userId}`);
            if(!result) {
              throw new Error(result.message || 'Где-то ошибка');
            }
            setUser(result.data);
      
          } catch(err) {
            console.log(err);
          };
        
    }
    const fetchWatchings = async ()=>{
        try {
            const result = await api.get(`watching/${userId}`);
            if(!result) {
              throw new Error(result.message || 'Где-то ошибка');
            }
            setWatchings(result.data);
      
          } catch(err) {
            console.log(err);
          };
    }
    
    useEffect(() => {
      fetchUser();
      fetchWatchings();
    },[]);

    return (
        <div>
            <button onClick={ () => history.go(-1) }>
              Вернуться к списку пользователей
            </button>
            <hr/>
            <div   className='film-stat-container'>
            {!!watchings && watchings.map((item, index)=>
              <div key={index}>
                <UserFilmItem filmWatching={item} userId={userId}/>
              </div>
            )}
            </div>
        </div>
    );
}

export default UserStatInfo;