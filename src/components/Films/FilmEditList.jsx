import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { useHttpHook } from '../Hooks/api.hook';
import './Films.css';

function FilmEditList () {
  // const divHeight = document.querySelector('.film-item');
  // divHeight && console.log('divHeight', divHeight.offsetHeight);
  const filmsQtyPerPageOnWindowInit = Math.floor((window.innerHeight - 430) / 80);
  const { api } = useHttpHook();
  const { url } = useRouteMatch();
  const [ filmsQtyPerPageOnWindow, setFilmsQtyPerPageOnWindow ] = useState(filmsQtyPerPageOnWindowInit);
  const [ films, setFilms ] = useState([]);
  const [ filmsDataSearch, seFilmsDataSearch ] = useState('');
  const [ queryFilmsQty, setQueryFilmsQty ] = useState(filmsQtyPerPageOnWindow);
  const [ currentPage, setCurrentPage ] = useState(1);

  useEffect(() => {
    const changeHeight = () => {
      setFilmsQtyPerPageOnWindow(Math.floor((window.innerHeight - 430) / 80));
    };
    window.addEventListener('resize', changeHeight);
    return () => window.removeEventListener('resize', changeHeight);
  }, []);

  const getFilmsBySearchRqst = async () => {
    try {
      const result = await api.get(`/films/search?editFilmFlag=1&searchReq=${ filmsDataSearch }&page=${ currentPage }&limit=${ filmsQtyPerPageOnWindow }`);

      if(!result) {
        throw new Error(result.message || 'Где-то ошибка');
      }
      setQueryFilmsQty(result.data.pop());
      setFilms(result.data);
    } catch(err) {
      console.log(err);
    };
  };

  useEffect(() => {
    getFilmsBySearchRqst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ currentPage, filmsQtyPerPageOnWindow ]);

  const filmsSearchUpdate = (e) => {
    e.preventDefault();
    seFilmsDataSearch(e.target.value);
  };

  useEffect(() => {
    getFilmsBySearchRqst();
    setCurrentPage(1);
    // setFilmsQtyPerPageOnWindow(filmsQtyPerPageOnWindow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ filmsDataSearch ]);

  return (
    <div className='users-cont' >
      <div>
        <span>Search film to edit </span>
        <input
          type="text"
          name="usersearch"
          value={ filmsDataSearch }
          onChange={ filmsSearchUpdate }
        />
        <i className="fa fa-search"> { queryFilmsQty }</i>
      </div>

      { films.map(film =>
        <div className="film-item" key={ film._id }>
          <div className="film-name" >
            <Link to={ `${ url }/${ film._id }` }>{ film.name } </Link>
          </div>
          <div className="film-year" >{ film.year }</div>
          <button><Link to={ `/admin/delete-films/${ film._id }` }>Delete film</Link></button>
        </div>
      ) }
      <Pagination
        elementQtyPerPage={ filmsQtyPerPageOnWindow }
        queryElementQty={ queryFilmsQty }
        setCurrentPage={ setCurrentPage }
        currentPage={ currentPage }
      />

    </div>
  );
}

export default React.memo(FilmEditList);