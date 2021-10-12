/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, } from 'react';
import { PATHTO } from '../../constants/constants';
import { INITFILMSDATA } from '../../constants/constants';
import './Admin.css';
import { v4 as uuidv4 } from 'uuid';
import InputField from './admin-components/InputField'
import InputFileField from './admin-components/InputFileField'
import ShowImages from './admin-components/ShowImages'

export default function Admin ({ filmToEdit }) {

  const [ filmsData, setFilmsData ] = useState(INITFILMSDATA);
  const [ filesToSend, setFilesToSend ] = useState(new FormData());

  const addFiles = (e) => {
    const { target: { name, files } } = e;
    console.log('addfiles', files);
    let fd = new FormData();
    for(let [ name, value ] of filesToSend) {
      fd.append(name, value);
    }
    fd.delete(name);
    const filesToLoad = Array.from(files);
    filesToLoad.forEach(file => {
      fd.append(name, file);
      dispalyImage(file, name,0,e);
    });

    console.log([ ...fd ]);
    setFilesToSend(fd);

    let copyFilmsData = JSON.parse(JSON.stringify(filmsData));

    if(filesToLoad.length > 1) {
      filesToLoad.forEach(file => {
        copyFilmsData[ name ].push(file.name);
      });
    } else {
      copyFilmsData[ name ] = files[ 0 ].name;
    }

    setFilmsData(copyFilmsData);
  };

  const dispalyImage=(file,field,index, e)=>{

    let reader = new FileReader();
    // const imgtag = document.createElement('img');
    let imgtag = document.getElementById(`${field}${index}`);
    if (imgtag !== null){
      imgtag.title = file.name;
      reader.onload = function(e) {
        imgtag.src = e.target.result;
      };
      // document.body.appendChild(imgtag);
      reader.readAsDataURL(file);
    }
  }
  const addPhotoFiles = (field, e, index) => {
    const { target: { name, files } } = e;
    
    let fd = new FormData();
    for(let [ name, value ] of filesToSend) {
      fd.append(name, value);
    }

    const filesToLoad = Array.from(files);
    filesToLoad.forEach(file => {
      fd.append(field, file);
      // fd.append('actors', file);
      dispalyImage(file, field,index,e);
    });

    console.log([ ...fd ]);
    setFilesToSend(fd);

    let copyFilmsData = JSON.parse(JSON.stringify(filmsData));
    copyFilmsData[ field ][ index ][ name ] = filesToLoad[ 0 ].name;
    console.log('copyFilmsData', copyFilmsData);

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

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const sendData = dataToSend();
    try {
      const response = await fetch(`${ PATHTO.HOST_NAME }/films`, {
        method: 'POST',
        body: sendData,
      });
      const result = await response.json();
      console.log(result);
    } catch(error) {
      console.log('Ошибка загрузки заданий', error);
    }
    setFilmsData(INITFILMSDATA);
  };

  const updateFilmData = (field, e, index) => {
    const { target: { value, name } } = e;

    const copyFilmsData = JSON.parse(JSON.stringify(filmsData));
    
    if(Array.isArray(copyFilmsData[ field ])) {
      name === '' ? copyFilmsData[ field ][ index ] = value : copyFilmsData[ field ][ index ][ name ] = value;
      console.log("Array field",copyFilmsData);
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

  const addItem = (field) => {
    // console.log('field', field);
    const copyFilmsData = JSON.parse(JSON.stringify(filmsData));
    if(field === 'images') {
      copyFilmsData.images.push('');
    } else {
      copyFilmsData[ field ].push({ rewards: [], name: '', photo: '', });
    }

    setFilmsData(copyFilmsData);
  };

  const delItem = (field) => {

    const copyFilmsData = JSON.parse(JSON.stringify(filmsData));
    if(field === 'images') {
      copyFilmsData.images.pop('');
    } else {
      copyFilmsData[ field ].pop({ rewards: [], name: '', photo: '', });
    }

    setFilmsData(copyFilmsData);
  };

  useEffect(() => {
    console.log('Admin', filmToEdit);
    if(filmToEdit !== undefined) setFilmsData(filmToEdit);
    else setFilmsData(INITFILMSDATA);
  }, [ filmToEdit ]);

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

          <div className='btn-grp'>
            <div className='input-name actw-wid' >
              <div className='btn-grp'>
                <span className='titles-width'>Director's names:</span>
                <button onClick={ () => addItem('director') } className='add-item'>+</button>
                <button onClick={ () => delItem('director') } className='add-item'>-</button>
                <span className='titles-width'>Directors`s photo:</span>
              </div>

              <div>
                { filmsData.director.map((director, index) => {

                  return (
                    <div style={ { display: 'flex', alignItems: 'center' }} key={ uuidv4()}>
                      <input key={ uuidv4()}
                        value={ director.name }
                        onChange={ (e) => updateFilmData('director', e, index) }
                        type="text"
                        name='name'
                        placeholder='director`s name'
                      />
                      <input key={ uuidv4()}
                        onChange={ (e) => addPhotoFiles('director', e, index) }
                        type="file"
                        name='photo'
                        placeholder='director`s photo'
                      />
                      <img id={`director${index}`} className='image-preview' alt={ director.name } /> 
                      {/* { !!director.photoSrc && <img className='image-preview' src={ director.photoSrc } alt={ index } /> } */}
                    </div>
                  );
                }) }
              </div>
            </div>

          </div>

          <div className='btn-grp'>
            <div className='input-name actw-wid '>
              <div className='btn-grp' >
                <span className='titles-width'>Actor`s name:</span>
                <button onClick={ () => addItem('actors') } className='add-item'>+</button>
                <button onClick={ () => delItem('actors') } className='add-item'>-</button>
                <span className='titles-width'>Actor`s photo:</span>
              </div>
              <div>
                { filmsData.actors.map((actor, index) => {

                  return (
                    <div style={ { display: 'flex', alignItems: 'center' } } key={ uuidv4()}>
                      <input key={ uuidv4() }
                        value={ filmsData.actors[index].name }
                        // value={ actor.name }
                        onChange={ (e) => updateFilmData('actors', e, index) }
                        type="text"
                        name='name'
                        placeholder='actor`s name'
                      />
                      <input key={ uuidv4() }
                        onChange={ (e) => addPhotoFiles('actors', e, index) }
                        type="file"
                        name='photo'
                        placeholder='actor`s photo'
                      />
                      <img id={`actors${index}`} className='image-preview' alt={``}/> 
                      {/* { !!actor.photoSrc && <img className='image-preview' src={ actor.photoSrc } alt={ index } /> } */}
                    </div>
                  );
                }) }
              </div>
            </div>
          </div>

          <InputFileField fieldName={'poster'} images={filmsData.poster} onChangeFunction={addFiles} multiple={false} />
          {/* <img id={`poster`} className='image-preview' alt={ 'poster' } /> */}
          <ShowImages fieldName={'poster'} imageFiles={filesToSend} />

          <InputField 
            value={filmsData.trailer} 
            fieldName={'trailer'} 
            placeholder={'trailer'} 
            updateFilmData={updateFilmData} 
            inputType={'text'}
          />

          <InputFileField fieldName={'images'} images={filmsData.images} onChangeFunction={addFiles} multiple={true} />
          {/* <ShowImages fieldName={'images'} imageFiles={filesToSend} /> */}
         
        </div>
        <button onClick={ handleSubmit }>Submit</button>
      </div>
    </div>
  );
}