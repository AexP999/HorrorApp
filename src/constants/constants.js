const PATHTO ={

    HOST_NAME :'http://localhost:3001',
    ACTORS_PHOTO :'actors_img',
    POSTER :'poster',
    TRAILER :'trailer',
    FRAMES: 'img',
    LIMIT:6
}

const INITFILMSDATA = {
director: [ { rewards: [], name: '', photo: '' } ],
images: [],
_id: '',
name: '',
year: '',
country: '',
category: '',
actors: [ { rewards: [], name: '', photo: '' }, ],
poster: '',
trailer: ''
};

const PATHTODATANODE = 'http://localhost:3001'

export {PATHTO,INITFILMSDATA, PATHTODATANODE}