import React, { useEffect, useState } from 'react';
import { useHttpHook } from '../../Hooks/api.hook';
import './AllUsers.css';

export default function AllUsers () {
  const [ users, setUsers ] = useState([]);
  const { api } = useHttpHook();

  const getUsers = async () => {
    try {
      const result = await api.get('/auth/users');
      setUsers(result.data);
      if(!result) {
        console.log('Something went wrong');
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
        setUsers(result.data);
      } catch(err) {
        console.log(err);
      };
    };
  };

  const handleSendRole = async (id, role, e) => {
    e.preventDefault();
    console.log('READY TO SEND', id, role);

    try {
      const result = await api.put(`/auth/users/${ id }`, { role });
      if(result) {
        console.log('updated successful');
      }
      getUsers();
    } catch(err) {
      console.log(err);
    };
  };

  const handleChangeRole = (e) => {
    const { target: { value, name } } = e;
    users[ name ].role = value;
    setUsers([ ...users ]);
  };

  console.log('usersRENDER', users);

  return (
    <div className='users-cont'>
      { users.map((elem, index) => {
        return (
          <div key={ elem.id + index } className='user-form-cont' >
            <div className='users'>
              id: <span> { elem.id }</span>
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
