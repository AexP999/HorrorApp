import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Search.css';

export default function Search ({ films }) {
  const [ dataToSearch, setDataToSearch ] = useState('');

  const searchUpdate = (e) => {
    setDataToSearch(e.target.value);
  };
  const fieldsArr1 = [ 'name', 'year', 'category', 'country' ];
  const fieldsArr2 = [ 'actors', 'director' ];

  const filteredSimpleDataFunc = (FIELD) => {
    return films.filter(film => {
      return film[ FIELD ].toString().toLowerCase().includes(dataToSearch.toLowerCase());
    }).map(item => item._id);
  };

  const filteredActorDirectorFunc = (FIELD) => {
    return films.filter(film => {
      const qw = film[ FIELD ].filter(el => {
        return el.name.toString().toLowerCase().includes(dataToSearch.toLowerCase());
      });
      return (qw.length !== 0);
    }).map(item => item._id);
  };

  let filteredSimpleData = dataToSearch && [ ...new Set(fieldsArr1.map(el =>
    filteredSimpleDataFunc(el))
    .flat()
  ) ];

  let filteredActorDirectorData = dataToSearch && [ ...new Set(fieldsArr2.map(el => filteredActorDirectorFunc(el)).flat()) ];

  let filteredData = dataToSearch && [ ...new Set(filteredSimpleData.concat(filteredActorDirectorData).flat()) ];

  const filmsById = (value_id) => {

    return films.filter(film => film._id === value_id);
  };

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
        <span style={ { marginLeft: "10px" } }>{ filteredData.length }</span>
      </div>
      { dataToSearch
        ? <div className='search-results'>
          { filteredData.map((film_id, index) => {
            return (
              <div key={ film_id + index } >
                <div className="cont-film" >
                  <span > Фильм: </span>
                  <Link to={ `/filmscard/${ film_id }` } >
                    { filmsById(film_id)[ 0 ].name }
                  </Link>
                  <span> Год: </span> { filmsById(film_id)[ 0 ].year }
                  <span> Категрория: </span> { filmsById(film_id)[ 0 ].category }
                  <span> Страна: </span> { filmsById(film_id)[ 0 ].country }
                  <hr />
                  <span> Актеры: </span>{ filmsById(film_id)[ 0 ].actors.map((el, index) => <div className="act-dir" key={ el + index }>{ el.name }</div>) }
                  <span> Режиссеры: </span> { filmsById(film_id)[ 0 ].director.map((el, index) => <div className="act-dir" key={ el + index }>{ el.name }</div>) }
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
