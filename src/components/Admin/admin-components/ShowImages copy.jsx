// import React, { useState } from 'react';
// import '../Admin.css';

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

// function ShowImages({fieldName, imageFiles}) {
    
//     const imgTags=[];

//     const filesToShow=[];
//     for(let [ name, value ] of imageFiles) {
//         if (name === fieldName) filesToShow.push(value);
//     }
//     const destDiv=document.getElementById(fieldName);
//     debugger
//     filesToShow.forEach((file,index)=>{
//         let reader = new FileReader();
//         let tag = document.createElement('img');
        
//         tag.title=file.name;
//         reader.onload = function(e) {
//             tag.src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//         debugger
//         imgTags.push(tag);
//     })
//     console.log("ShowImages", imgTags);
//     return (
//         <div id={fieldName}>
//         { imgTags.map((image,index) => document.getElementById(fieldName).appendChild(imgTags[index])) }
//         </div>
//     );
// }

// export default ShowImages;