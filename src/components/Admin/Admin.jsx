/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, } from 'react';
// import { PATHTO } from '../../constants/constants';
import { INITFILMSDATA } from '../../constants/constants';
import './Admin.css';
import InputField from './admin-components/InputField';
import InputFileField from './admin-components/InputFileField';
import ShowImages from './admin-components/ShowImages';
import InputActorsData from './admin-components/InputActorsData';
import { cloneDeep } from 'lodash/fp';

export default function Admin ({ filmToEdit }) {

  const [ filmsData, setFilmsData ] = useState(INITFILMSDATA);
  let filesToSend = new FormData();
  let filesToDelete = new FormData();

  const addPhoto = (field, e, index) => {
    // adds photo to array 'actors' or 'directors'
    let { target: { files } } = e;
    let copyFilmsData = cloneDeep(filmsData);

    if(files === undefined)
      copyFilmsData[ field ][ index ].photo.sourceLocal = '';
    else
      copyFilmsData[ field ][ index ].photo.sourceLocal = files[ 0 ];
    setFilmsData(copyFilmsData);
  };

  const addImageFiles = (field, e) => {
    // adds field photo to 'images' and 'poster'
    let { target: { files } } = e;
    let copyFilmsData = cloneDeep(filmsData);

    // files == undefined means to clear file's input 
    if(files !== undefined) files = Array.from(files);
    // clear previous files
    if(Array.isArray(copyFilmsData[ field ])) {
      let tmp = copyFilmsData[ field ].filter(item => item.sourceLocal === '');
      copyFilmsData[ field ] = tmp;
    }
    else
      copyFilmsData[ field ].sourceLocal = '';

    if(files !== undefined && files.length > 0) {
      if(Array.isArray(copyFilmsData[ field ]))
        files.forEach(file =>
          copyFilmsData[ field ].push({ imageName: '', sourceBase: '', sourceLocal: file })
        );
      else
        copyFilmsData[ field ].sourceLocal = files[ 0 ];
    }

    setFilmsData(copyFilmsData);
  };

  // function filesToSend () {
  //   const fd = new FormData();
  //   for(let [ name, value ] of filesToSend) {
  //     fd.append(name, value);
  //   }
  //   return fd;
  // }

  const removeField = (obj, fieldToRemove) => {
    // removes field 'fieldToRemove' from obj
    for(let key in obj) {
      if(key === fieldToRemove) {
        delete obj[ key ];
      } else
        if(Array.isArray(obj[ key ])) {
          obj[ key ].forEach(element => {
            removeField(element, fieldToRemove);
          });
        } else
          if(typeof obj[ key ] === 'object') {
            removeField(obj[ key ], fieldToRemove);
          }
    }
    return obj;
  };
  const fieldObjectToString = (obj, parentField, childField) => {
    // transforms field structured like
    //  { imageName:'', 
    //   sourceBase:'', 
    //   sourceLocal:''}
    // to str=imageName

    if(parentField === 'images'){
      const founded = obj[ parentField ].findIndex( element=> element.sourceLocal !== '')
      // если нет ни одного элемента с непустым sourceLocal ничего не делаем и идем дальше
      if(founded !== -1){
        // был добавлен новый элемент, значит надо все предыдущие внести в список удаления
        const removeArray = obj[parentField].filter(element =>element.sourceLocal === '') 
        const saveArray = obj[parentField].filter(element =>element.sourceLocal !== '') 
        removeArray.forEach(element => filesToDelete.append(parentField,element.imageName))
        saveArray.forEach(element => filesToSend.append(parentField,element.imageName))

        obj[parentField] = saveArray;
      }
    }

    if(Array.isArray(obj[ parentField ])) {
      obj[ parentField ].forEach((element, index) => {
        if(childField in element) {
          // actors director
          if(element[ childField ].sourceLocal === '')
            element[ childField ] = element[ childField ].imageName;
          else {
            filesToSend.append(parentField, element[ childField ].sourceLocal);
            if(element[ childField ].imageName !== '') filesToDelete.append(parentField, element[ childField ].imageName);
            element[ childField ] = element[ childField ].sourceLocal.name;
          }
        } else {
          // images
          if(obj[ parentField ][ index ].sourceLocal === '')
              obj[ parentField ][ index ] = element.imageName;
          else 
            obj[ parentField ][ index ] = element.sourceLocal.name;
        }
      });
    } else
      // poster
      if(obj[ parentField ].sourceLocal === '')
        obj[ parentField ] = obj[ parentField ].imageName;
      else {
        filesToSend.append(parentField, obj[ parentField ].sourceLocal);
        filesToDelete.append(parentField, obj[ parentField ].imageName);
        obj[ parentField ] = obj[ parentField ].sourceLocal.name;
      }
  };

  const normaliseFilmsData = (filmInfo) => {
    // needs to remove '_id' field from whole object
    let data = removeField(filmInfo, '_id');
    // needs to transform field 'photo'
    fieldObjectToString(data, 'poster', 'photo');
    fieldObjectToString(data, 'images', 'photo');
    fieldObjectToString(data, 'director', 'photo');
    fieldObjectToString(data, 'actors', 'photo');

    console.log([ ...filesToSend ]);
    console.log([ ...filesToDelete ]);
    return data;
  };

  const handleSubmit = async (e) => {

    // const sendData = dataToSend();
    // try {
    //   const response = await fetch(`${ PATHTO.HOST_NAME }/films`, {
    //     method: 'POST',
    //     body: sendData,
    //   });
    //   const result = await response.json();
    //   console.log(result);
    // } catch(error) {
    //   console.log('Ошибка загрузки заданий', error);
    // }

    // cleaning file inputs
    document.getElementsByName('poster')[ 0 ].value = '';
    document.getElementsByName('images')[ 0 ].value = '';

    const result = normaliseFilmsData(filmsData);
    console.log('handleSubmit after', result);
    setFilmsData(INITFILMSDATA);
  };

  const updateFilmData = (field, e, index) => {
    //
    const { target: { value, name } } = e;
    let copyFilmsData = cloneDeep(filmsData);

    if(Array.isArray(copyFilmsData[ field ])) {
      copyFilmsData[ field ][ index ].name = value;
      setFilmsData(copyFilmsData);
      return;
    }

    copyFilmsData[ name ] = value;
    setFilmsData(copyFilmsData);
  };

  useEffect(() => {
    // console.log('Admin', filmToEdit);
    if(filmToEdit !== undefined) {
      setFilmsData(filmToEdit);
    }
    else setFilmsData(INITFILMSDATA);
  }, [ filmToEdit ]);

  console.log('useEffect', filmsData);
  return (
    <div>
      <div>
        <div className='input-cont'>
          <InputField
            value={ filmsData.name }
            fieldName={ 'name' }
            placeholder={ 'film`s name' }
            updateFilmData={ updateFilmData }
            inputType={ 'text' }
          />
          <InputField
            value={ filmsData.country }
            fieldName={ 'country' }
            placeholder={ 'country name' }
            updateFilmData={ updateFilmData }
            inputType={ 'text' }
          />

          <InputField
            value={ filmsData.year }
            fieldName={ 'year' }
            placeholder={ 'year' }
            updateFilmData={ updateFilmData }
            inputType={ 'number' }
          />

          <InputField
            value={ filmsData.category }
            fieldName={ 'category' }
            placeholder={ 'film`s category' }
            updateFilmData={ updateFilmData }
            inputType={ 'text' }
          />

          <InputActorsData
            field='director'
            filmsData={ filmsData }
            setFilmsData={ setFilmsData }
            updateFilmData={ updateFilmData }
            addPhotoFiles={ addPhoto }
          />
          <InputActorsData
            field='actors'
            filmsData={ filmsData }
            setFilmsData={ setFilmsData }
            updateFilmData={ updateFilmData }
            addPhotoFiles={ addPhoto }
          />

          <div className='input-name'>
            <InputFileField
              fieldName={ 'poster' }
              images={ filmsData.poster }
              onChangeFunction={ addImageFiles }
              multiple={ false }
              showTitle={ true }
            />
            <ShowImages imageFiles={ filmsData.poster } />
            {/* <ShowImages fieldName={'poster'} imageFiles={filmsData.poster} /> */ }
          </div>
          <InputField
            value={ filmsData.trailer }
            fieldName={ 'trailer' }
            placeholder={ 'trailer' }
            updateFilmData={ updateFilmData }
            inputType={ 'text' }
          />
          <div className='input-name'>
            <InputFileField
              fieldName={ 'images' }
              images={ filmsData.images }
              onChangeFunction={ addImageFiles }
              multiple={ true }
              showTitle={ true }
            />
            <ShowImages imageFiles={ filmsData.images } />
            {/* <ShowImages fieldName={'images'} imageFiles={filmsData.images} /> */ }
          </div>

        </div>
        <button onClick={ handleSubmit }>Submit</button>
      </div>
    </div>
  );
}