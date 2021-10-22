import React from 'react';

function InputPerson({field, value, updateFilmsData, index}) {
    return (
        <div>
             <input
                    value={ value}
                    onChange={ (e) => updateFilmsData(`${field}` , e, index) }
                    type="text"
                    name={`name${index}`}
                    placeholder='enter name'
                    // key={`${field}${index}`}
                  />
        </div>
    );
}

export default InputPerson;