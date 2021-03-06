import React from 'react';
import InputPerson from './InputPerson';
import ShowImages from './ShowImages';
import InputFileField from './InputFileField';
import { cloneDeep} from 'lodash/fp';

function InputActorsData({field, filmsData, setFilmsData, updateFilmData, addPhotoFiles}) {

    function inputToUpperCase(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    const addRemoveItem = (field, action) => {
    
      let copyFilmsData = cloneDeep(filmsData);

      if (action==='ADD') 
        copyFilmsData[ field ].push({ rewards: [], name: '', photo: {imageName:'', sourceBase:'', sourceLocal:'',} });
      else 
        copyFilmsData[ field ].pop();
  
      setFilmsData(copyFilmsData);
    };

    return (
      <div className='btn-grp'>
        <div className='input-name actw-wid' >
          <div className='btn-grp'>
            <span className='titles-width'>{`${inputToUpperCase(field)}'s names:`}</span>
            <button onClick={ () => addRemoveItem(field, 'ADD') } className='add-item'>+</button>
            <button onClick={ () => addRemoveItem(field, 'REMOVE') } className='add-item'>-</button>
            <span className='titles-width'>Photo:</span>
          </div>

          <div>
            { filmsData[field].map((person, index) => {

              return (
                <div style={ { display: 'flex', alignItems: 'center' }} key={`${field}${index}`}>
                 <InputPerson field={field} value={person.name} updateFilmData={updateFilmData} index={index} />
                 <InputFileField 
                  fieldName={field} 
                  images={person.photo.sourceLocal} 
                  index={index}
                  onChangeFunction={addPhotoFiles} 
                  multiple={false}
                  showTitle={false} 
                />
                 <ShowImages 
                  imageFiles={person.photo}
                />
                </div>
              );
            }) }
          </div>
        </div>
      </div>
    );
}

export default InputActorsData;
