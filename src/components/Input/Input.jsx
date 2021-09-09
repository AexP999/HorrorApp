import React from 'react';
import './Input.css';
import classNames from 'classnames';

export default function Input (id, className, label, error, ...attrs) {
  const classes = classNames(
    'input',
    className,
    { error },
  );

  return (
    <div>
      <div className="inputWrapper">
        <div className="labelsWrapper">
          { label
            && <label className="inputLabel" htmlFor={ id }>{ label }</label>
          }
          { attrs.required
            && <span className="inputRequired">Required</span>
          }
        </div>
        <input
          name={ id }
          id={ id }
          className={ classes }
          { ...attrs }
        />
        { error
          && <span className="inputError">{ error }</span>
        }
      </div>
    </div>
  );
}
