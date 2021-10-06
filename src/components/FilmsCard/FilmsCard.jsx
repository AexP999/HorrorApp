import React from 'react';
// import { FilmContext } from '../Context';
import UseFetch from '../UseFetch';
import { PATHTO, PATHTODATANODE } from '../../constants/constants';
import { useParams } from "react-router-dom";
import './FilmsCard.css';


export default function FilmsCard (props) {
  const { id } = useParams();


  const url = `${ PATHTO.HOST_NAME }/films/${ id }  `;

  const { isLoading, films } = UseFetch(url);
  console.log('films', films);

  return (
    <div>
      { films.length !== 0 ?
        <div className='filmCard-container' >

          <div className='fimCard-body'>
            <h1 > Фильм "{ films.name }"</h1>
            <div className='film-details'>
              <span >{ films.year }, { films.country }, { films.category }, режисеры:
                <>{ films.director.map((director1, i) => {
                  return (
                    <span key={ director1._id }> { director1.name } </span>
                  );
                }) }
                </>
              </span>

            </div>

            <div style={ { marginBottom: '30px' } } >Актеры: { films.actors.map((actor) => {
              return (
                <span key={ actor._id }>{ actor.name }, </span>
              );
            }) }
            </div>

            <iframe width="70%" height="400" src={ `${ films.trailer }` }
              title="YouTube video player" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>

            <h2>Актеры и создатели</h2>
            <div className='directors-actors-cont'>
              <>{ films.director.map((director1) => {
                return (
                  <div className='card-inner' key={ director1._id } >

                    <div className='img-cont circle'>

                      <img width={ 100 } src={ `${ PATHTODATANODE }/${ films._id }/actors_img/${ director1.photo }` } alt="" />
                    </div>
                    <div className='dir-act-text'>
                      <div style={ { fontWeight: '700' } }>{ director1.name }</div> режисер</div>
                  </div>
                );
              }) }
              </>

              <>{ films.actors.map((actor) => {
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
            {/* <div >Images: { films.images.map((image, i) => {
              return (
                <div key={ i }>{ <img src={ `${ PATHTODATANODE }/${ films._id }/img/${ image }` } alt="" /> }</div>
              );
            }) }
            </div>
            <div >Poster:  <img src={ `${ PATHTODATANODE }/${ films._id }/poster/${ films.poster }` } alt="" />
            </div> */}
          </div>

        </div> : null }

    </div>

  );
}
