import React from 'react';
import { Link } from "react-router-dom";
import { PATHTO } from '../../constants/constants';

function FilmPoster({films}) {
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

export default FilmPoster;