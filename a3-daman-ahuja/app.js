import express from 'express';
import data from './our-modules/data.js';
import renderAlbumPage from './our-modules/renderAlbumPage.js';

const app = express();
app.listen(3000, ()=>console.log('server listening on 3000'));

//Task 2
app.get('/pages/:pageName', (req, res)=>{
    res.sendFile(`/public/${req.params.pageName}`, {root: import.meta.dirname});
});

//Task 3
app.get(['/', '/pages'], (req, res)=>{
    res.redirect('/pages/index.html');
});

//TAsk 4
app.get('/api/music/:bandId', (req, res)=>{
    //this line(i used ai to get this, because i was not sure about the syntax)
    //I know its matching the band id with the id that we gave also === is for strictly equal but was not sure how to implement this 
    const band = data.find(band=>band.id === req.params.bandId);

    if(band == undefined) {
        res.status(404).send('Band not found');
    }
    else {
        res.json(band);
    }
});

// Display a page about a specific album.
//Task 5:
app.get('/music-pages/:bandId/:albumId', (req, res)=>{
    const page = renderAlbumPage(req.params.bandId, req.params.albumId);

    if(page == undefined) {
        res.status(404).send('Album not found');
    }
    else {
        res.send(page);
    }
});
