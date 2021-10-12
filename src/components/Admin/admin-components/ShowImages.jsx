import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../Admin.css';

// const dispalyImage=(file,field,index, e)=>{

//     let reader = new FileReader();
//     // const imgtag = document.createElement('img');
    
//     let imgtag = document.getElementById(`${field}${index}`);
//     if (imgtag !== null){
//       imgtag.title = file.name;
//       reader.onload = function(e) {
//         imgtag.src = e.target.result;
//       };
//       // document.body.appendChild(imgtag);
//       reader.readAsDataURL(file);
//     }
//   }

function ShowImages({fieldName, imageFiles}) {
    
    const imgSrc=[];
    
    debugger
    const filesToShow=[];
    for(let [ name, value ] of imageFiles) {
        if (name === fieldName) filesToShow.push(value);
    }
    // const destDiv=document.getElementById(fieldName);
    filesToShow.forEach((file,index)=>{
        let reader = new FileReader();
        // let tag = document.createElement('img');
        
        // tag.title=file.name;
        reader.onload = function(e) {
          imgSrc.push(e.target.result);
        };
        reader.readAsDataURL(file);
        // imgTags.push(tag);
      })
      console.log("ShowImages", imgSrc[0]);
    return (
        <div id={fieldName}>
          
        <img src={imgSrc[0]} alt='ww' />
        {/* { imgSrc.map((src) => <img key={uuidv4() } src={src} alt='ww' />) } */}

        {/* { imgTags.map((image,index) => document.getElementById(fieldName).appendChild(imgTags[index])) } */}
        </div>
    );
}

export default ShowImages;