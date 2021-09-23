/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, } from 'react';
import { PATHTO } from '../../constants/constants';
import { INITFILMSDATA } from '../../constants/constants';
import './Admin.css';

export default function Admin () {

  const [ filmsData, setFilmsData ] = useState(INITFILMSDATA);
  const [filesToSend, setFilesToSend] = useState(new FormData());
  
  const addFiles=(e)=>{
    const {target:{name, files} } = e;
    let fd=new FormData();
    for(let [name, value] of filesToSend) {
      fd.append(name, value);
    }
    fd.delete(name);
    const filesToLoad = Array.from(files);
    filesToLoad.forEach(file=>{
      fd.append(name, file);
    })
    
    console.log([...fd]);
    setFilesToSend(fd);
    
    let copyFilmsData = JSON.parse(JSON.stringify(filmsData));
    if (filesToLoad.length>1){
      filesToLoad.forEach(file=>{
        copyFilmsData[name].push(file.name)
      })
    }else {
      copyFilmsData[name] = files[0].name;
    }

    setFilmsData(copyFilmsData);
  }
  
  const addPhotoFiles=(field, e, index)=>{
    const {target:{name, files} } = e;
    debugger
    let fd=new FormData();
    for(let [name, value] of filesToSend) {
      fd.append(name, value);
    }

    const filesToLoad = Array.from(files);
    filesToLoad.forEach(file=>{
      fd.append('actors', file);
    })
    
    console.log([...fd]);
    setFilesToSend(fd);
    
    let copyFilmsData = JSON.parse(JSON.stringify(filmsData));
    copyFilmsData[field][name] = files[0].name;

    setFilmsData(copyFilmsData);
  }

  function dataToSend () {
    const fd = new FormData();
    for(let [name, value] of filesToSend) {
      fd.append(name, value);
    }
    // removing _id from filmsData
    const tmpData = JSON.parse(JSON.stringify(filmsData));
    delete tmpData._id;
    fd.append('data', JSON.stringify(tmpData));
    console.log([...fd]);
    return fd;
}

  const handleSubmit = async (e)=>{
    // e.preventDefault();
    const sendData = dataToSend();
        try{
           const response = await fetch(`${PATHTO.HOST_NAME}/films`, {
               method: 'POST',
               body: sendData,
           });
           const result = await response.json();
           console.log(result);
        } catch (error) {
              console.log('Ошибка загрузки заданий', error);
        }
    setFilmsData(INITFILMSDATA);
  };

  const updateFilmData = (field, e, index) => {

    const { target: { value, name} } = e;

    const copyFilmsData = JSON.parse(JSON.stringify(filmsData));

    if(Array.isArray(copyFilmsData[ field ])) {
      name === '' ? copyFilmsData[ field ][ index ] = value : copyFilmsData[ field ][ index ][ name ] = value;
      setFilmsData(copyFilmsData);
      return;
    }
    if(typeof ((filmsData[ field ])) === 'object') {
      copyFilmsData[ field ][ name ] = value;
      setFilmsData(copyFilmsData);
      return;
    }
    copyFilmsData[ name ] = value;
    console.log(copyFilmsData);
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

  return (
    <div>
      <h1>Admin panel</h1>
      <div>
        <div className='input-cont'>

          <div className='input-name'><span className='titles-width'>Name:</span>
            <input
              value={ filmsData.name }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='name'
              placeholder='film`s name'
            />
          </div>

          <div className='input-name'><span className='titles-width'>Country:</span>
            <input
              value={ filmsData.country }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='country'
              placeholder='film`s country'
            />
          </div>

          <div className='input-name'><span className='titles-width'>Year:</span>
            <input
              value={ filmsData.year }
              onChange={ (e) => updateFilmData('', e) }
              type="number"
              name='year'
              placeholder='film`s year'
            />
          </div>

          <div className='input-name'><span className='titles-width'>Category:</span>
            <input
              value={ filmsData.category }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='category'
              placeholder='film`s category'
            />
          </div>

          <div className='input-name actw-wid' ><span className='titles-width'>Director's names:</span>
            <button onClick={ () => addItem('director') } className='add-item'>+</button>
            <div>
              { filmsData.director.map((director1, index) => {

                return (
                  <input key={ index }
                    value={ director1.name }
                    onChange={ (e) => updateFilmData('director', e, index) }
                    type="text"
                    name='name'
                    placeholder='director`s name'
                  />
                );
              }) }
            </div>
          </div>

          <div className='input-name actw-wid'><span style={ { marginRight: '20px' } } className='titles-width'>Director's photo:</span>
            <div>
              { filmsData.director.map((director1, index) => {

                return (
                  <input key={ index }
                    // value={ director1.photo }
                    onChange={ (e) => addPhotoFiles('director', e, index) }
                    type="file"
                    name='photo'
                    placeholder='director`s photo'
                  />
                );
              }) }
            </div>
          </div>

          <div className='input-name actw-wid '><span className='titles-width'>Actor`s name:</span>
            <button onClick={ () => addItem('actors') } className='add-item'>+</button>
            <div>
              { filmsData.actors.map((actor, index) => {

                return (
                  <input key={ index }
                    value={ actor.name }
                    onChange={ (e) => updateFilmData('actors', e, index) }
                    type="text"
                    name='name'
                    placeholder='actor`s name'
                  />
                );
              }) }
            </div>
          </div>

          <div className='input-name actw-wid '><span style={ { marginRight: '20px' } } className='titles-width'>Actor`s photo:</span>
            <div >
              { filmsData.actors.map((actor, index) => {

                return (
                  <input key={ index }
                    value={ actor.photo }
                    onChange={ (e) => updateFilmData('actors', e, index) }
                    type="text"
                    name='photo'
                    placeholder='actor`s photo'
                  />
                );
              }) }
            </div>
          </div>

          <div className='input-name'><span className='titles-width'>Poster:</span>
            <input
              onChange={addFiles}
              type="file"
              name='poster'
              placeholder='film`s poster'
            />
          </div>

          <div>{!!filesToSend.has('poster') && filesToSend.getAll('poster').map( el=> <span>{'| '+el.name+' |'}</span>)}</div>
  
          <div className='input-name'><span className='titles-width'>Trailer:</span>
            <input
              value={ filmsData.trailer }
              onChange={ (e) => updateFilmData('', e) }
              type="text"
              name='trailer'
              placeholder='film`s trailer'
            />
          </div>

          <div className='input-name' ><span className='titles-width'>Images:</span>
          <input
              onChange={addFiles}
              type="file"
              name='images'
              multiple
              placeholder='film`s images'
            />
          </div>
          <div>{!!filesToSend.has('images') && filesToSend.getAll('images').map( el=> <span>{'| '+el.name+' |'}</span>)}</div>

        </div>
        <button onClick={ handleSubmit }>Submit</button>
      </div>
    </div>
  );
}
