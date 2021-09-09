import React, { useContext, useState } from 'react';
import { FilmContext } from '../Context';

import './Admin.css';

export default function Admin () {
  //   const [ directorData, setDirectorData ] = useState({
  //     rewards: [], name: { first: '', last: '' }, photo: ''
  //   });

  //   const [ actorData, setActorData ] = useState({
  //     rewards: [], name: '', photo: ''
  //   });

  const [ filmsData, setFilmsData ] = useState({
    director: { rewards: [], name: '', photo: '' },
    images: [],
    _id: '',
    name: '',
    year: '',
    country: '',
    category: '',
    actors: { rewards: [], name: '', photo: '' },
    poster: '',
    trailer: ''
  });

  const handleSubmit = () => {
    alert(JSON.stringify(filmsData, null, 2));
    setFilmsData({
      director: { rewards: [], name: '', photo: '' },
      images: [],
      _id: '',
      name: '',
      year: '',
      country: '',
      category: '',
      actors: [ { rewards: [], name: '', photo: '', } ],
      poster: '',
      trailer: ''
    });
    // сброс данных после сабмита
  };

  const { films } = useContext(FilmContext);
  console.log('films', films);

  const updateFilmData = (field, e) => {

    const { target: { value, name } } = e;

    console.log(value, name, field);

    const copyFilmsData = JSON.parse(JSON.stringify(filmsData));

    console.log('tepeof', typeof (filmsData.images));

    if(typeof ((filmsData[ field ])) === 'object') {
      copyFilmsData[ field ][ name ] = value;
      setFilmsData(copyFilmsData);

    } else {
      copyFilmsData[ name ] = value;
      setFilmsData(copyFilmsData);
    }

  };

  console.log(filmsData);

  return (
    <div>
      <h1>Admin panel</h1>
      <div>
        <div className='input-cont'>
          <label >Director's names:
            <input
              value={ filmsData.director.name }
              onChange={ (e) => updateFilmData('director', e) }
              type="text"
              name='name'
              placeholder='enter the director`s name'
            />
            { filmsData.director.name }
          </label>
          <label>Director's photo:
            <input
              value={ filmsData.director.photo }
              onChange={ (e) => updateFilmData('director', e) }
              type="text"
              name='photo'
              placeholder='enter director`s photo'
            />
            { filmsData.director.photo }
          </label>

          <label>Name:
            <input
              value={ filmsData.name }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='name'
              placeholder='enter film`s name'
            />
            { filmsData.name }
          </label>
          <label>Country:</label>
          <input
            value={ filmsData.country }
            onChange={ (e) => updateFilmData('', e) }
            type="text"
            name='country'
            placeholder='enter film`s country'
          />
          { filmsData.country }

          <label>Year:
            <input
              value={ filmsData.year }
              onChange={ (e) => updateFilmData('', e) }
              type="number"
              name='year'
              placeholder='enter film`s year'
            />
            { filmsData.year }
          </label>
          <label>Poster:
            <input
              value={ filmsData.poster }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='poster'
              placeholder='enter film`s poster'
            />
            { filmsData.poster }
          </label>
          <label>Trailer:
            <input
              value={ filmsData.country }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='country'
              placeholder='enter film`s country'
            />
            { filmsData.country }
          </label>
          <label>Actors:
            <input
              value={ filmsData.actors.name }
              onChange={ (e) => updateFilmData('actors', e) }
              type="text"
              name='name'
              placeholder='enter actor`s name'
            />
            { filmsData.actors.name }
          </label>
          <label>Actor`s photo:
            <input
              value={ filmsData.actors.photo }
              onChange={ (e) => updateFilmData('actors', e) }
              type="text"
              name='photo'
              placeholder='enter actor`s photo'
            />
            { filmsData.actors.photo }
          </label>
        </div>
        <button onClick={ handleSubmit }>Submit</button>
      </div>

      <div>
        <div style={ { color: 'antiquewhite' } }>
          { JSON.stringify(films[ 0 ], 2, 3) }

        </div>
        { (films.map((film, i) => {
          return (
            <div className='film-info' key={ film.name + i }>

              <div >Name: { film.name }</div>
              <div >Country: { film.country }</div>
              <div >Category: { film.category }</div>
              <div >Director: { film.director.name } { film.director.photo } { film.director.reward }</div>
              <div >Year: { film.year }</div>
              <div >Actors: { film.actors.map((actor, i) => {
                return (
                  <div key={ actor + i }>{ actor.name } { actor.photo }</div>
                );
              }) }
              </div>
            </div>
          );
        })) }
      </div>
    </div>
  );
}
