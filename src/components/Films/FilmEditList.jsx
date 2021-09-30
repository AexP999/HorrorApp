import React from 'react';

function FilmEditList({films}) {
    return (
        <div >
            { films.map(film => 
                <div key={ film._id }>
                    <span>{film.name+' '}</span>
                    <span>{film.year+' '}</span>
                </div>
            ) }
        </div>
    );
}

export default FilmEditList;