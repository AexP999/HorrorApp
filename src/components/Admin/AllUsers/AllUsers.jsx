import React, { useEffect, useState } from 'react';
import { useHttpHook } from '../../Hooks/api.hook';
import {Link, useRouteMatch} from 'react-router-dom';
import './AllUsers.css';

export default function AllUsers () {
  const [ users, setUsers ] = useState([]);
  const [ userDataSearch, setUserDataSearch ] = useState('');
  const { api } = useHttpHook();
  const {url} = useRouteMatch();

  const getUsersBySearchRqst = async () => {
    try {
      const result = await api.post(`/users/search`, { email: userDataSearch });
      console.log('RESULT', result.data);
      if(!result) {
        throw new Error(result.message || 'Где-то ошибка');
      }
      setUsers(result.data);

    } catch(err) {
      console.log(err);
    };
  };

  const onDelete = async (id) => {

    if(window.confirm('R U sure?')) {
      try {
        const result = await api.delete(`/auth/users/${ id }`);
        if(result) {
          console.log('deleted successful');
        }
        setUsers(result.data);
      } catch(err) {
        console.log(err);
      };
    };
  };

  const handleSendRole = async (id, role, e) => {
    e.preventDefault();
    try {
      const result = await api.put(`/auth/users/${ id }`, { role });
      if(result) {
        console.log('updated successful');
      }
      getUsersBySearchRqst();
    } catch(err) {
      console.log(err);
    };
  };

  const handleChangeRole = (e) => {
    const { target: { value, name } } = e;
    users[ name ].role = value;
    setUsers([ ...users ]);
  };


  const userSearchUpdate = (e) => {
    e.preventDefault();
    setUserDataSearch(e.target.value);
  };

  useEffect(() => {
    getUsersBySearchRqst();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ userDataSearch ]);


  console.log('usersRENDER', users);
  console.log('userSearch', userDataSearch);

  return (
    <div className='users-cont'>
      <div>
        <span>Find User by email </span>
        <input
          type="text"
          name="usersearch"
          value={ userDataSearch }
          onChange={ userSearchUpdate }
        />
        <i className="fa fa-search"></i>

      </div>
      { users.map((elem, index) => {
        return (
          <div key={ elem.id + index } className='user-form-cont' >
            <div className='users'>
              id: <Link to={ `${url}/${elem.id}` }><span> { elem.id }</span></Link>
              role: <span style={ { color: elem.role === 'admin' ? 'red' : elem.role === 'moderator' ? 'orange' : 'whitesmoke' } }>{ elem.role }</span>
              email: <span>{ elem.email }</span>
            </div>
            <button onClick={ () => onDelete(elem.id) }>
              Delete
            </button>

            <form className='change-role-form' action="formdata" >
              <select name={ index } value={ elem.role } onChange={ handleChangeRole }>
                <option value="user">user</option>
                <option value="moderator">moderator</option>
                <option value="admin">admin</option>
              </select>
              <button onClick={ (e) => handleSendRole(elem.id, elem.role, e) } >Confirm</button>
            </form>
          </div>
        );

      }) }
    </div >
  );
};
