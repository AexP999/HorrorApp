import React from 'react';

function InputPerson({field, value, updateFilmData, index}) {
    return (
        <div>
             <input
                    value={ value}
                    onChange={ (e) => updateFilmData(field , e, index) }
                    type="text"
                    name='name'
                    placeholder='enter name'
                  />
        </div>
    );
}

export default InputPerson;