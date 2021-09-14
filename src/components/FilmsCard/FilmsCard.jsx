import React, { useContext, useState } from 'react';
// import { FilmContext } from '../Context';
import UseFetch from '../UseFetch';
import { PATHTO, PATHTODATANODE } from '../../constants/constants';
import { useParams } from "react-router-dom";
import './FilmsCard.css';


export default function FilmsCard (props) {
  const { id } = useParams();


  const url = `${ PATHTO.HOST_NAME }/films/${ id }  `;

  // const { films } = useContext(FilmContext);
  const [ film, setFilm ] = useState();

  const { isLoading, films } = UseFetch(url);

  return (
    <div>
      { films.length !== 0 ?
        <div className='films-out' >
          {

            <div className='film-info'>

              <div >Name: { films.name }</div>
              <div >Country: { films.country }</div>
              <div >Category: { films.category }</div>
              <div >Director:{ films.director.map((director1, i) => {
                return (
                  <div key={ director1._id }>{ director1.name }  <img src={ `${ PATHTODATANODE }/${ films._id }/actors_img/${ director1.photo }` } alt="" /> </div>
                );
              }) }
              </div>
              <div >Year: { films.year }</div>


              <div >Poster:  <img src={ `${ PATHTODATANODE }/${ films._id }/poster/${ films.poster }` } alt="" /> </div>

              <div >Actors: { films.actors.map((actor, i) => {
                return (
                  <div key={ i }>{ actor.name } { <img src={ `${ PATHTODATANODE }/${ films._id }/actors_img/${ actor.photo }` } alt="" /> }</div>
                );
              }) }
              </div>
              <div >Images: { films.images.map((image, i) => {
                return (
                  <div key={ i }>{ <img src={ `${ PATHTODATANODE }/${ films._id }/img/${ image }` } alt="" /> }</div>
                );
              }) }
              </div>


            </div>
          }
        </div> : null }

    </div>

  );
}
