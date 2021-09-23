/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, } from 'react';
import { PATHTO } from '../../constants/constants';
import { Link } from "react-router-dom";
import './Films.css';

const postersAllFilms = [];

export default function Films () {
  const [ films, setFilms ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ fetching, setFetching ] = useState(true);
  const [ maxNumberPages, setmaxNumberPages ] = useState(0);

  const url = `${ PATHTO.HOST_NAME }/films?page=${ currentPage + 1 }&limit=${ PATHTO.LIMIT }`;

  useEffect(() => {
    async function fetchData () {
      console.log('fetching');
      const response = await fetch(`${ url }`);
      const { result, totalPages } = await response.json();
      console.log('result', result, 'totalPages', totalPages);
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

  console.log('films render', films);

  return (
    <div className="all-films-header">
      <h1>Фильмы</h1>
      <div className="all-films-cont">
        <nav>

          <div className="all-films-table" >

            { films.map((film, i) => {
              return (
                <div key={ i } className="posterEl" >
                  <Link to={ `/filmscard/${ film._id }` }>
                    <img src={ `${ PATHTO.HOST_NAME }/${ film._id }/poster/${ film.poster }` } alt="" />
                  </Link>
                </div>
              );
            }) }

          </div>
        </nav>

      </div>
    </div>
  );
}


{/* <div>
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
                      <div key={ director1._id }>{ director1.name }  <img src={ `${ PATHTO.HOST_NAME }/${ film._id }/actors_img/${ director1.photo }` } alt="" /> </div>
                    );
                  }) }
                  </div>
                  <div style={ { display: 'flex' } } >Year: { film.year }</div>

                  <div >Poster:  <img src={ `${ PATHTO.HOST_NAME }/${ film._id }/poster/${ film.poster }` } alt="" /> </div>

                  <div style={ { display: 'flex' } } >Actors: { film.actors.map((actor, i) => {
                    return (
                      <div className='actors-cont' key={ i }><div>{ actor.name }</div> { <img src={ `${ PATHTO.HOST_NAME }/${ film._id }/actors_img/${ actor.photo }` } alt="" /> }</div>
                    );
                  }) }
                  </div>
                  <div style={ { display: 'flex', flexWrap: 'wrap' } } >Images: { film.images.map((image, i) => {
                    return (
                      <div style={ { margin: '5px 5px' } } key={ i }>{ <img src={ `${ PATHTO.HOST_NAME }/${ film._id }/img/${ image }` } alt="" /> }</div>
                    );
                  }) }
                  </div>

                </div>
              );
            })) }
          </div>
        </div> */}

