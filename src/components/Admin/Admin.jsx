/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, } from 'react';
import { PATHTO } from '../../constants/constants';
import { INITFILMSDATA, PATHTODATANODE } from '../../constants/constants';
import './Admin.css';

export default function Admin () {

  const [ filmsData, setFilmsData ] = useState(INITFILMSDATA);
  const [ films, setFilms ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ fetching, setFetching ] = useState(true);
  const [ maxNumberPages, setmaxNumberPages ] = useState(0);

  const url = `${ PATHTO.HOST_NAME }/films?page=${ currentPage + 1 }&limit=2`;

  useEffect(() => {
    async function fetchData () {
      console.log('fetching');
      const response = await fetch(`${ url }`);
      const { result, totalPages } = await response.json();
      console.log('result', result);
      console.log(result, totalPages);
      setFilms([ ...films, ...result ]);
      setCurrentPage(prev => prev + 1);
      setmaxNumberPages(totalPages);
      setFetching(false);

    }
    if(fetching) { fetchData(); };
  }, [ fetching ]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [ fetching ]);

  const scrollHandler = (e) => {

    if((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) && (currentPage < maxNumberPages)) {
      setFetching(true);
    };
  };

  const handleSubmit = () => {
    alert(JSON.stringify(filmsData, null, 2));
    setFilmsData(INITFILMSDATA);
    // сброс данных после сабмита
  };

  console.log('films', films);

  const updateFilmData = (field, e, index) => {

    const { target: { value, name } } = e;

    console.log('updateFilmData', value, name, field, index);

    const copyFilmsData = JSON.parse(JSON.stringify(filmsData));

    if(Array.isArray(copyFilmsData[ field ])) {
      name === '' ? copyFilmsData[ field ][ index ] = value : copyFilmsData[ field ][ index ][ name ] = value;
      setFilmsData(copyFilmsData);
      return;
    }
    if(typeof ((filmsData[ field ])) === 'object') {
      copyFilmsData[ field ][ name ] = value;
      setFilmsData(copyFilmsData);
      return;
    }
    copyFilmsData[ name ] = value;
    setFilmsData(copyFilmsData);
  };

  const addItem = (field) => {
    console.log('field', field);
    const copyFilmsData = JSON.parse(JSON.stringify(filmsData));
    if(field === 'images') {
      copyFilmsData.images.push('');
    } else {
      copyFilmsData[ field ].push({ rewards: [], name: '', photo: '', });
    }

    setFilmsData(copyFilmsData);
  };

  console.log('render', filmsData);

  return (
    <div>
      <h1>Admin panel</h1>
      <div>
        <div className='input-cont'>

          <div className='input-name'><span className='titles-width'>Name:</span>
            <input
              value={ filmsData.name }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='name'
              placeholder='film`s name'
            />
          </div>

          <div className='input-name'><span className='titles-width'>Country:</span>
            <input
              value={ filmsData.country }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='country'
              placeholder='film`s country'
            />
          </div>

          <div className='input-name'><span className='titles-width'>Year:</span>
            <input
              value={ filmsData.year }
              onChange={ (e) => updateFilmData('', e) }
              type="number"
              name='year'
              placeholder='film`s year'
            />
          </div>

          <div className='input-name'><span className='titles-width'>Category:</span>
            <input
              value={ filmsData.category }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='category'
              placeholder='film`s category'
            />
          </div>

          <div className='input-name actw-wid' ><span className='titles-width'>Director's names:</span>
            <button onClick={ () => addItem('director') } className='add-item'>+</button>
            <div>
              { filmsData.director.map((director1, index) => {

                return (
                  <input key={ index }
                    value={ director1.name }
                    onChange={ (e) => updateFilmData('director', e, index) }
                    type="text"
                    name='name'
                    placeholder='director`s name'
                  />
                );
              }) }
            </div>
          </div>

          <div className='input-name actw-wid'><span style={ { marginRight: '20px' } } className='titles-width'>Director's photo:</span>
            <div>
              { filmsData.director.map((director1, index) => {

                return (
                  <input key={ index }
                    value={ director1.photo }
                    onChange={ (e) => updateFilmData('director', e, index) }
                    type="text"
                    name='photo'
                    placeholder='director`s photo'
                  />
                );
              }) }
            </div>
          </div>


          <div className='input-name actw-wid '><span className='titles-width'>Actor`s name:</span>
            <button onClick={ () => addItem('actors') } className='add-item'>+</button>
            <div>
              { filmsData.actors.map((actor, index) => {

                return (
                  <input key={ index }
                    value={ actor.name }
                    onChange={ (e) => updateFilmData('actors', e, index) }
                    type="text"
                    name='name'
                    placeholder='actor`s name'
                  />
                );
              }) }
            </div>
          </div>

          <div className='input-name actw-wid '><span style={ { marginRight: '20px' } } className='titles-width'>Actor`s photo:</span>
            <div >
              { filmsData.actors.map((actor, index) => {

                return (
                  <input key={ index }
                    value={ actor.photo }
                    onChange={ (e) => updateFilmData('actors', e, index) }
                    type="text"
                    name='photo'
                    placeholder='actor`s photo'
                  />
                );
              }) }
            </div>
          </div>

          <div className='input-name'><span className='titles-width'>Poster:</span>
            <input
              value={ filmsData.poster }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='poster'
              placeholder='film`s poster'
            />
          </div>

          <div className='input-name'><span className='titles-width'>Trailer:</span>
            <input
              value={ filmsData.trailer }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='trailer'
              placeholder='film`s country'
            />

          </div>

          <div className='input-name actw-wid' ><span className='titles-width'>Images:</span>
            <button onClick={ () => addItem('images') } className='add-item'>+</button>
            <div>
              { filmsData.images.map((image, index) => {

                return (
                  <input key={ index }
                    value={ image.name }
                    onChange={ (e) => updateFilmData('images', e, index) }
                    type="text"
                    name=''
                    placeholder='images'
                  />
                );
              }) }
            </div>
          </div>

        </div>
        <button onClick={ handleSubmit }>Submit</button>
      </div>

      <div>
        <div style={ { color: 'antiquewhite' } }></div>
        <div className='films-out' >
          { (films.map((film, i) => {
            return (
              <div className='film-info' key={ film.name + i }>
                <div >Name: { film.name }</div>
                <div >Country: { film.country }</div>
                <div >Category: { film.category }</div>
                <div style={ { display: 'flex' } } >Director:{ film.director.map((director1, i) => {
                  return (
                    <div key={ director1._id }>{ director1.name }  <img src={ `${ PATHTODATANODE }/${ film._id }/actors_img/${ director1.photo }` } alt="" /> </div>
                  );
                }) }
                </div>
                <div style={ { display: 'flex' } } >Year: { film.year }</div>

                <div >Poster:  <img src={ `${ PATHTODATANODE }/${ film._id }/poster/${ film.poster }` } alt="" /> </div>

                <div style={ { display: 'flex' } } >Actors: { film.actors.map((actor, i) => {
                  return (
                    <div className='actors-cont' key={ i }><div>{ actor.name }</div> { <img src={ `${ PATHTODATANODE }/${ film._id }/actors_img/${ actor.photo }` } alt="" /> }</div>
                  );
                }) }
                </div>
                <div style={ { display: 'flex', flexWrap: 'wrap' } } >Images: { film.images.map((image, i) => {
                  return (
                    <div style={ { margin: '5px 5px' } } key={ i }>{ <img src={ `${ PATHTODATANODE }/${ film._id }/img/${ image }` } alt="" /> }</div>
                  );
                }) }
                </div>

              </div>
            );
          })) }
        </div>
      </div>
    </div>
  );
}
