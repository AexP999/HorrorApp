const PATHTO ={

    HOST_NAME :'http://localhost:3001',
    ACTORS_PHOTO :'actors_img',
    POSTER :'poster',
    TRAILER :'trailer',
    FRAMES: 'img',
    LIMIT:6
}

const INITFILMSDATA = {
director: [ { rewards: [], name: 'dir1', photo: '' } ],
images: [],
_id: '',
name: 'name',
year: '2015',
country: 'usa',
category: 'hor',
actors: [ { rewards: [], name: 'actor1', photo: '' } ],
poster: '',
trailer: 'trailer',
};


const PATHTODATANODE = 'http://localhost:3001'

export {PATHTO,INITFILMSDATA, PATHTODATANODE}