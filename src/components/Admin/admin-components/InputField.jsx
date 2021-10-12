import React from 'react';
import '../Admin.css';

function inputToUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function InputField({value,fieldName, placeholder, updateFilmData, inputType}) {
    return (
        <div className='input-name'><span className='titles-width'>{inputToUpperCase(fieldName)}:</span>
            <input
              value={ value }
              onChange={ (e) => updateFilmData('', e) }
              type={inputType}
              name={fieldName}
              placeholder={placeholder}
            />
        </div>
    );
}

export default InputField;