import React, { useEffect, useState } from 'react';
import { useHttpHook } from '../../Hooks/api.hook';
import './AllUsers.css';

export default function AllUsers () {
  const [ users, setUsers ] = useState([]);
  const { api } = useHttpHook();

  const getUsers = async () => {
    try {
      const result = await api.get('/auth/users');
      console.log('result', result.data);
      setUsers(result.data);
      if(result) {
        console.log('users got');
      }
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = async (id) => {

    if(window.confirm('R U sure?')) {

      try {
        const result = await api.delete(`/auth/users/${ id }`);
        if(result) {
          console.log('deleted successful');
        }
        getUsers();
      } catch(err) {
        console.log(err);

      };
    };
  };
  console.log('usersRENDER', users);

  return (
    <div className='users-cont'>
      { users.map((elem, index) => {
        return (
          <div key={ elem.id + index } style={ { display: 'flex' } }>
            <div className='users'>
              id: <span> { elem.id }</span>
              role: <span style={ { color: elem.role === 'admin' ? 'red' : 'whitesmoke' } }>{ elem.role }</span>
              email: <span>{ elem.email }</span>
            </div>
            <button onClick={ () => onDelete(elem.id) }>
              Delete
            </button>
          </div>
        );

      }) }
    </div>
  );
};
