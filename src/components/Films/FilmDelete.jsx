/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { PATHTO } from '../../constants/constants';
import { Link } from "react-router-dom";
import './FilmDelete.css'

function FilmDelete(props) {
    const { filmID } = useParams();
    const hist=useHistory();
    const url = `${ PATHTO.HOST_NAME }/films/${ filmID }`;
    const [ filmById, setFilmById ] = useState(undefined);

    const filmFetch = async () => {
        const response = await fetch(url);
        const film = await response.json();
        if(film) setFilmById(film);
    };

    useEffect(() => {
        filmFetch();
    }, []);

    const onDeleteFilm = async () => {
        const response = await fetch(url,{method:'DELETE'});
        const film = await response.json();
        if(film)
            console.log('deleted film', film);
        else 
            console.log(`film ${filmById.name} wasn't deleted`, );
        hist.goBack();
    }

    return (
        <div>
            <hr/>
            {!!filmById && (
                <>
                    <h2> Вы удаляете фильм! </h2>
                    <div className="field-container">
                        <div className="field-title">
                            <h4>Название: </h4>
                        </div>
                        <div className="field-list">
                            <h3>{filmById.name}</h3>
                        </div>
                    </div>
                    <div className="field-container">
                        <div className="field-title">
                            <h4>Год выпуска: </h4>
                        </div>
                        <div className="field-list">
                            <h3>{filmById.year} г.</h3>
                        </div>
                    </div>
                    <div className="field-container">
                        <div className="field-title">
                            <h4>Режиссер(ы): </h4>
                        </div>
                        <div className="field-list">
                            {filmById.director.map(item=>
                            <div key={item.name}><h3>{item.name}</h3></div>  
                            )}
                        </div>
                    </div>
                </>)
            }
            <br></br>
            <div className="field-container">
                <button className="field-title">
                    <Link to={`/admin/edit-films`} style={{textDecoration: "none"}}>
                        <h2>Back to film's list</h2>
                    </Link>
                </button>
                <button className="field-list delete-button" onClick={onDeleteFilm}>
                    Delete film
                </button>
            </div>
            
        </div>
    );
}

export default FilmDelete;