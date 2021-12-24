import React, { useEffect, useState } from 'react';
import { useHttpHook } from '../../Hooks/api.hook';
import Pagination from '../../Pagination/Pagination';
import { Link, useRouteMatch } from 'react-router-dom';
import './AllUsers.css';

export default function AllUsers () {
  // const usersQtyPerPageInit = 3;
  const filmsQtyPerPageOnWindowInit = Math.floor((window.innerHeight - 480) / 50);
  const [ users, setUsers ] = useState([]);
  const [ userDataSearch, setUserDataSearch ] = useState('');
  const [ queryUsersQty, setQueryUsersQty ] = useState(filmsQtyPerPageOnWindowInit);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ usersQtyPerPage, setUsersQtyPerPage ] = useState(filmsQtyPerPageOnWindowInit);

  const { api } = useHttpHook();
  const { url } = useRouteMatch();

  useEffect(() => {
    const changeHeight = () => {
      setUsersQtyPerPage(Math.floor((window.innerHeight - 480) / 50));
    };
    window.addEventListener('resize', changeHeight);
    return () => window.removeEventListener('resize', changeHeight);
  }, []);

  useEffect(() => {
    getUsersBySearchRqst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentPage, usersQtyPerPage ]);

  const getUsersBySearchRqst = async () => {
    try {
      const result = await api.post(`/users/search?page=${ currentPage }&limit=${ usersQtyPerPage }`, {
        email: userDataSearch
      });

      if(!result) {
        throw new Error(result.message || 'Где-то ошибка');
      }
      setQueryUsersQty(result.data.pop());
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
    setCurrentPage(1);
    setUsersQtyPerPage(usersQtyPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ userDataSearch ]);

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
              id: <Link to={ `${ url }/${ elem.id }` }><span> { elem.id }</span></Link>
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
      <Pagination
        elementQtyPerPage={ usersQtyPerPage }
        queryElementQty={ queryUsersQty }
        setCurrentPage={ setCurrentPage }
        currentPage={ currentPage }
      />
    </div >
  );
};
