import React, { useState } from 'react';
import './ThemeSwitcher.css';

export default function ThemeSwitcher () {
  const [ themeIsActive, setThemeIsActive ] = useState(false);

  const themeToggle = () => {

    document.body.classList.toggle('light');

    setThemeIsActive(!themeIsActive);

  };

  return (

    <div>

      <i onClick={ themeToggle } className="fa fa-adjust" id="wb_switcher" aria-hidden="true"></i>
    </div>
  );
}
