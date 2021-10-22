/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, } from 'react';
import { PATHTO } from '../../constants/constants';
import { INITFILMSDATA } from '../../constants/constants';
import './Admin.css';
import InputField from './admin-components/InputField'
import InputFileField from './admin-components/InputFileField'
import ShowImages from './admin-components/ShowImages'
import InputActorsData from './admin-components/InputActorsData';

export default function Admin ({ filmToEdit }) {

  const [ filmsData, setFilmsData ] = useState(INITFILMSDATA);
  const [ filesToSend, setFilesToSend ] = useState(new FormData());

  const addFiles = (fieldName, files) => {
    
    let fd = new FormData();
    for(let [ name, value ] of filesToSend) {
      fd.append(name, value);
    }
    fd.delete(fieldName);
    
    let filesToLoad=[];
    
    if (files){
      filesToLoad = Array.from(files);
      filesToLoad.forEach(file => {
        fd.append(fieldName, file);
      });
    }
   
    setFilesToSend(fd);
    
    let copyFilmsData = JSON.parse(JSON.stringify(filmsData));
    if(files.length === 0){
      if( Array.isArray(copyFilmsData[ fieldName ])) copyFilmsData[ fieldName ]=[];
      else copyFilmsData[ fieldName ]='';
    } else{
      if(filesToLoad.length > 1) {
        copyFilmsData[ fieldName ]=[]
        filesToLoad.forEach(file => {
          copyFilmsData[ fieldName ].push(file.name);
        });
      } else copyFilmsData[ fieldName ] = files[ 0 ].name;
    }
    setFilmsData(copyFilmsData);
  };

  const addPhotoFiles = (field, e, index) => {
    const { target: { name, files } } = e;

    let fd = new FormData();
    for(let [ name, value ] of filesToSend) {
      fd.append(name, value);
    }

    const filesToLoad = Array.from(files);
    filesToLoad.forEach(file => {
      fd.append(field, file);
    });
    
    setFilesToSend(fd);
    
    let copyFilmsData = JSON.parse(JSON.stringify(filmsData));
    copyFilmsData[ field ][ index ][ name ] = filesToLoad[ 0 ].name;

    setFilmsData(copyFilmsData);
  };

  function dataToSend () {
    const fd = new FormData();
    for(let [ name, value ] of filesToSend) {
      fd.append(name, value);
    }
    // removing _id from filmsData
    const tmpData = JSON.parse(JSON.stringify(filmsData));
    delete tmpData._id;
    fd.append('data', JSON.stringify(tmpData));
    console.log([ ...fd ]);
    return fd;
  }

  const removeField=(obj,fieldToRemove)=>{
    for (let key in obj){
      if ( key === fieldToRemove ) {
        delete obj[key]
      } else
        if(Array.isArray(obj[key])){
          obj[key].forEach(element=>{
            removeField(element,fieldToRemove)
          })
        } else
          if( typeof obj[key] === 'object'){ 
            removeField(obj[key],fieldToRemove)
          }  
    }
    return obj;
  }
  const fieldObjectToString=(obj, parentField, childField)=>{
        
    if(Array.isArray(obj[parentField])){
      obj[parentField].forEach((element, index)=>{
        if (childField in element){
          element[childField]=element[childField].imageName;
        } else {
          console.log(parentField, element, element.imageName);
          obj[parentField][index]=element.imageName
          console.log(obj[parentField]);  
        }
      })
    } else obj[parentField]=obj[parentField].imageName;
    return obj;
  }
  const normaliseFilmsData=(filmInfo)=>{
    // needs to remove '_id' field & transform each field like
    // photo: { 
    //   imageName:'', 
    //   sourceBase:'', 
    //   sourceLocal:''}
    // to photo:'str' where str=imageName
    let data = removeField(filmInfo,'_id');
    data = fieldObjectToString(data, 'poster','photo');
    data = fieldObjectToString(data, 'images','photo');
    data = fieldObjectToString(data, 'director','photo');
    data = fieldObjectToString(data, 'actors','photo');
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
    const result = normaliseFilmsData(filmsData);
    console.log('handleSubmit', result);
    setFilmsData(INITFILMSDATA);
  };

  const updateFilmData = (field, e, index) => {
    const { target: { value, name } } = e;

    const copyFilmsData = JSON.parse(JSON.stringify(filmsData));

    if(Array.isArray(copyFilmsData[ field ])) {
      if (name.indexOf('name') !== -1) copyFilmsData[ field ][ index ].name = value;
      else copyFilmsData[ field ][ index ].photo = value;
      console.log('updateFilmData got array', copyFilmsData[ field ]);
      // name === '' ? copyFilmsData[ field ][ index ] = value : copyFilmsData[ field ][ index ][ name ] = value;
      setFilmsData(copyFilmsData);
      return;
    }

    if(typeof ((filmsData[ field ])) === 'object') {
      copyFilmsData[ field ][ name ] = value;
      console.log("object field",copyFilmsData);
      setFilmsData(copyFilmsData);
      return;
    }
    copyFilmsData[ name ] = value;
    console.log("root field",copyFilmsData);
    setFilmsData(copyFilmsData);
  };

  useEffect(() => {
    // console.log('Admin', filmToEdit);
    if(filmToEdit !== undefined) setFilmsData(filmToEdit);
    else setFilmsData(INITFILMSDATA);
  }, [ filmToEdit ]);

  console.log('useEffect', filmsData );
  return (
    <div>
      <div>
        <div className='input-cont'>
          <InputField 
            value={filmsData.name} 
            fieldName={'name'} 
            placeholder={'film`s name'} 
            updateFilmData={updateFilmData} 
            inputType={'text'}
          />
          <InputField 
            value={filmsData.country} 
            fieldName={'country'} 
            placeholder={'country name'} 
            updateFilmData={updateFilmData} 
            inputType={'text'}
          />
          
          <InputField 
            value={filmsData.year} 
            fieldName={'year'} 
            placeholder={'year'} 
            updateFilmData={updateFilmData} 
            inputType={'number'}
          />
          
          <InputField 
            value={filmsData.category} 
            fieldName={'category'} 
            placeholder={'film`s category'} 
            updateFilmData={updateFilmData} 
            inputType={'text'}
          />

          {/* <InputActorsData 
            field='director' 
            filmsData={filmsData} 
            setFilmsData={setFilmsData} 
            updateFilmsData={updateFilmData} 
            addPhotoFiles={addPhotoFiles} 
          />
          <InputActorsData 
            field='actors' 
            filmsData={filmsData} 
            setFilmsData={setFilmsData} 
            updateFilmsData={updateFilmData} 
            addPhotoFiles={addPhotoFiles} 
          /> */}

          <div className='input-name'>
            <InputFileField fieldName={'poster'} images={filmsData.poster} onChangeFunction={addFiles} multiple={false} />
            <ShowImages fieldName={'poster'} imageFiles={filesToSend} />
          </div>
          <InputField 
            value={filmsData.trailer} 
            fieldName={'trailer'} 
            placeholder={'trailer'} 
            updateFilmData={updateFilmData} 
            inputType={'text'}
          />
          <div className='input-name'>
            <InputFileField fieldName={'images'} images={filmsData.images} onChangeFunction={addFiles} multiple={true} />
            <ShowImages fieldName={'images'} imageFiles={filesToSend} />
          </div>
         
        </div>
        <button onClick={ handleSubmit }>Submit</button>
      </div>
    </div>
  );
}