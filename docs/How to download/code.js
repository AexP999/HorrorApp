https://dev.to/boobo94/download-files-in-javascript-from-node-js-server-1215

Backend

import cors from 'cors';
import fs from 'fs';

.get('/download',
  cors({
    exposedHeaders: ['Content-Disposition'],
  }),
  async (req, res) => {
    try {
      const fileName = 'file.pdf'
      const fileURL = '/path/to/file/file.pdf'
      const stream = fs.createReadStream(fileURL);
      res.set({
        'Content-Disposition': `attachment; filename='${fileName}'`,
        'Content-Type': 'application/pdf',
      });
      stream.pipe(res);
    } catch (e) {
      console.error(e)
      res.status(500).end();
    }
  };
})


Fronnt
import Axios from 'axios'
const response = await Axios.get('API_URL/download', { responseType: 'blob' });
if (response.data.error) {
  console.error(response.data.error)
}

const fileURL = window.URL.createObjectURL(new Blob([response.data]));
const fileLink = document.createElement('a');
fileLink.href = fileURL;
const fileName = response.headers['content-disposition'].substring(22, 52);
fileLink.setAttribute('download', fileName);
document.body.appendChild(fileLink);
fileLink.click();
fileLink.remove();