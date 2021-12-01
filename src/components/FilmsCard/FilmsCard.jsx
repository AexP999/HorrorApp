
import React, { useState, useEffect } from 'react';
import FilmPlayer from './FilmPlayer';
import { useHttpHook } from '../Hooks/api.hook';
import { PATHTODATANODE } from '../../constants/constants';
import { useParams } from "react-router-dom";
import StarRating from '../Rating/Rating';
import './FilmsCard.css';

export default function FilmsCard ({ userId }) {

  const [ rate, setRate ] = useState('');
  const [ films, setFilms ] = useState([]);
  const { api } = useHttpHook();
  const { id } = useParams();

  useEffect(() => {
    getFilmById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFilmById = async () => {
    try {
      const res = await api.get(`/films/${ id }`);
      setFilms(res.data);
      if(res.statusText !== 'OK') {
        console.log('что-то не так');
      }
    } catch(err) {
      console.log(err);
    };
  };

  useEffect(() => {
    const fetchRate = async () => {
      try {
        console.log(id, userId, rate);
        if(rate) {
          const res = await api.put(`/rating/`, { filmId: id, userId, rating: rate });
          if(res.statusText !== 'OK') {
            console.log('что-то не так');
          }
        }
      } catch(err) {
        console.log(err);
      };

    };
    fetchRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ rate ]);
  console.log('rate', rate);
  return (
    <div>
      { films.length !== 0 ?
        <div className='filmCard-container' >

          <div className='fimCard-body'>
            <h1 > Фильм "{ films.name }"</h1>
            <div className='film-details'>
              <span >{ films.year }, { films.country }, { films.category }, режисеры:
                <>{ !!films.director && films.director.map((director1, i) => {
                  return (
                    <span key={ director1._id }> { director1.name } </span>
                  );
                }) }
                </>
              </span>

            </div>

            <div style={ { marginBottom: '30px' } } >Актеры: { !!films.actors && films.actors.map((actor) => {
              return (
                <span key={ actor._id }>{ actor.name }, </span>
              );
            }) }
            </div>
            <div style={ { display: "flex" } }>
              { !!films.trailer.includes('youtube') &&
                <FilmPlayer
                  videoUrl={ films.trailer }
                  filmId={ id }
                  userId={ userId }
                /> }

              <div className="rates-cont">
                <StarRating setRate={ setRate } rate={ rate } />
              </div>
            </div>

            <h2>Актеры и создатели</h2>
            <div className='directors-actors-cont'>
              <>{ !!films.director && films.director.map((director1) => {
                return (
                  <div className='card-inner' key={ director1._id } >

                    <div className='img-cont circle'>

                      <img width={ 100 } src={ `${ PATHTODATANODE }/${ films._id }/directors_img/${ director1.photo }` } alt="" />
                    </div>
                    <div className='dir-act-text'>
                      <div style={ { fontWeight: '700' } }>{ director1.name }</div> режисер</div>
                  </div>
                );
              }) }
              </>

              <>{ films.actors && films.actors.map((actor) => {
                return (
                  <div className='card-inner' key={ actor._id }>
                    <div className='img-cont circle'>
                      { <img src={ `${ PATHTODATANODE }/${ films._id }/actors_img/${ actor.photo }` } alt="" /> }
                    </div >
                    <div className='dir-act-text'>
                      <div style={ { fontWeight: '700' } }>{ actor.name }</div> актер
                    </div>
                  </div>
                );
              }) }
              </>
            </div>

            { films.images.map((image, i) =>
              <img key={ `image${ i }` }
                style={ { width: '200px' } }
                src={ `${ PATHTODATANODE }/${ films._id }/img/${ image }` }
                alt="" />
            )
            }
          </div>

        </div> : null }

    </div>

  );
}
