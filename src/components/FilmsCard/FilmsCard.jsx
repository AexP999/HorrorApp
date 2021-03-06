
import React, { useState, useEffect } from 'react';
import FilmPlayer from './FilmPlayer';
import { useHttpHook } from '../Hooks/api.hook';
import { PATHTODATANODE } from '../../constants/constants';
import { useParams } from "react-router-dom";
import StarRating from '../Rating/Rating';
import './FilmsCard.css';
import Preview from '../Films/film-input-components/Preview';

export default function FilmsCard ({ userId }) {

  const [ rate, setRate ] = useState('');
  const [ aveRating, setAveRating ] = useState('');
  const [ films, setFilms ] = useState([]);
  const { api } = useHttpHook();
  const { id } = useParams();


  const getFilmById = async () => {
    try {
      const res = await api.get(`/films/${ id }`);
      setFilms(res.data);

      setAveRating(res.data.rating);

      if(res.statusText !== 'OK') {
        console.log('что-то не так');
      }
    } catch(err) {
      console.log(err);
    };
  };

  useEffect(() => {
    const getFilmRateByUserId = async () => {

      const combId = id + "|" + userId;

      const res = await api.get(`/rating/${ combId }`);

      setRate(res?.data);
    };
    getFilmRateByUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ userId ]);

  useEffect(() => {
    const fetchRate = async () => {
      try {

        if(rate) {
          const res = await api.put(`/rating/`, { filmId: id, userId, rating: rate });
          if(res.statusText !== 'OK') {
            console.log('что-то не так');
          }
        }
        await getFilmById();
      } catch(err) {
        console.log(err);
      };
    };
    fetchRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ rate ]);

  return (
    <div>
      { films.length !== 0
        ? <div className='filmCard-container' >

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

            <div>
              { !!films.trailer.includes('youtube') &&
                <FilmPlayer
                  videoUrl={ films.trailer }
                  filmId={ id }
                  userId={ userId }
                /> }
            </div>

            <div className="rates-cont">
              <div className="ave-rate-cont" >
                <h3>Рейтинг фильма</h3>
                <div className="stars-cont2">
                  <div className="stars-body">
                    <div className="test1">★★★★★★★★★★
                      <div
                        style={ { width: `${ aveRating * 10 }%` } } className="test1-inner">★★★★★★★★★★
                      </div>
                      <div style={ { fontSize: "70%", color: "crimson" } }>
                        { aveRating ? aveRating : 0 } of 10
                      </div>
                    </div>
                  </div>
                </div >
              </div>

              <div className="do-rate-thefilm" >
                <h3>Оцените фильм</h3>
                <StarRating setRate={ setRate } rate={ rate } />
              </div>
            </div>

            <div className="rates-cont">
              <div className="ave-rate-cont" >
                <h3>Количество просмотров</h3>
              </div>
              <div className="do-rate-thefilm" >
                <h3 style={ { fontSize: "140%", color: "crimson" } }>{ films.viewsNumber }</h3>
              </div>
            </div>

            <h2>Актеры и создатели</h2>
            <div className='directors-actors-cont'>
              { !!films.director && films.director.map((director1) => {
                return (
                  <div className='card-inner' key={ director1._id } >
                    <Preview
                      preview={ `${ PATHTODATANODE }/${ films._id }/directors_img/${ director1.photo }` }
                      extraClassName='img-cont circle'
                    />
                    <div className='dir-act-text'>
                      <div style={ { fontWeight: '700' } }>{ director1.name }</div> режисер</div>
                  </div>
                );
              }) }

              { films.actors && films.actors.map((actor) => {
                return (
                  <div className='card-inner' key={ actor._id }>
                    <Preview
                      preview={ `${ PATHTODATANODE }/${ films._id }/actors_img/${ actor.photo }` }
                      extraClassName='img-cont circle'
                    />
                    <div className='dir-act-text'>
                      <div style={ { fontWeight: '700' } }>{ actor.name }</div> актер
                    </div>
                  </div>
                );
              }) }
            </div>
            <div className='images-container'>
              { films.images.map((image, i) => {
                return (
                  <div style={ { cursor: 'pointer' } } key={ `image${ i }` }>
                    <Preview preview={ `${ PATHTODATANODE }/${ films._id }/img/${ image }` }></Preview>
                  </div>
                );
              }
              )
              }
            </div>
          </div>
        </div> : null }
    </div>
  );
}
