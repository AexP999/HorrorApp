import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './Films.css'

function FilmEditList({films}) {
    let { url } = useRouteMatch();
    return (
        <div>
            { films.map(film => 
                <div className ="film-item" key={ film._id }>
                    <div className ="film-name" >
                        <Link to={`${url}/${film._id}`}>{ film.name } </Link>
                    </div>
                    <div className ="film-year" >{ film.year}</div>
                    <button>Delete film</button>
                </div>
            ) }
        </div>
    );
}

export default FilmEditList;