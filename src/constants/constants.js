const PATHTO ={

    HOST_NAME :'http://localhost:3001',
    ACTORS_PHOTO :'actors_img',
    POSTER :'poster',
    TRAILER :'trailer',
    FRAMES: 'img',
    LIMIT:10
}

const INITFILMSDATA = {
director: [ { 
    rewards: [], 
    name: 'dir1', 
    photo: { 
        imageName:'', 
        sourceBase:'', 
        sourceLocal:''}
} ],
// director: [ { rewards: [], name: 'dir1', photo: ''} ],
// images: [],
images: [{imageName:'', sourceBase:'', sourceLocal:''}],
_id: '',
name: 'name',
year: '2015',
country: 'usa',
category: 'hor',
actors: [ { 
    rewards: [], 
    name: 'actor1', 
    photo: { 
        imageName:'', 
        sourceBase:'', 
        sourceLocal:''}
} ],
// actors: [ { rewards: [], name: 'actor1', photo: '' } ],
// poster: '',
poster: {imageName:'', sourceBase:'', sourceLocal:''},
trailer: 'trailer',
};


const PATHTODATANODE = 'http://localhost:3001'

export {PATHTO,INITFILMSDATA, PATHTODATANODE}