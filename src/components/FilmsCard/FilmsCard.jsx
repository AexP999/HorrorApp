import React, { useContext } from 'react';
import { FilmContext } from '../Context';

import './FilmsCard.css';

export default function FilmsCard () {
  const { films } = useContext(FilmContext);

  return (
    <div>
      Films Card
    </div>
  );
}
