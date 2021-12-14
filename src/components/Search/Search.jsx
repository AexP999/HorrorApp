import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHttpHook } from '../Hooks/api.hook';
import './Search.css';

export default function Search () {
  const [ dataToSearch, setDataToSearch ] = useState('');
  const [ films, setFilms ] = useState([]);
  const { api } = useHttpHook();

  const searchUpdate = (e) => {
    e.preventDefault();
    setDataToSearch(e.target.value);
  };

  const getFilmsBySearchRqst = async () => {
    try {
      const result = await api.get(`/films/search?searchReq=${ dataToSearch }`);
      console.log('RESULT', result.data);
      if(!result) {
        throw new Error(result.message || 'Где-то ошибка');
      }
      setFilms(result.data);

    } catch(err) {
      console.log(err);
    };
  };

  useEffect(() => {
    dataToSearch && getFilmsBySearchRqst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ dataToSearch ]);

  return (
    <div>
      <div className='search-cont'>
        <h1>Поиск</h1>
        { <input
          key="qweee"
          type="text"
          name="search"
          value={ dataToSearch }
          onChange={ searchUpdate }
        />
        }
        <i className="fa fa-search"></i>
        <span style={ { marginLeft: "10px" } }>
          { films.length }
        </span>
      </div>
      { dataToSearch
        ? <div className='search-results'>
          { films.map((film, index) => {
            return (
              <div key={ index } >
                <div className="cont-film" >
                  <span > Фильм: </span>
                  <Link to={ `/filmscard/${ film._id }` } >
                    { film.name }
                  </Link>
                  <span> Год: </span>
                  { film.year }
                  <span> Категрория: </span>
                  { film.category }
                  <span> Страна: </span>
                  { film.country }
                  <hr />
                  <span> Актеры: </span>
                  { film.actors.map((el, index) => <div className="act-dir" key={ el + index }>{ el.name }</div>) }

                  <span> Режиссеры: </span> { film.director.map((el, index) => <div className="act-dir" key={ el + index }>{ el.name }</div>) }
                </div>
              </div>
            );
          })
          }
        </div>
        : "" }
    </div>
  );
}
