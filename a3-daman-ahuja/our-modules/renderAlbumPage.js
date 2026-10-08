import data from './data.js';

const renderAlbumPage = (bandId, albumId)=>{
    const selectband = data.find(band=>band.id === bandId);

    if(selectband == undefined) {
        return undefined;
    }

    const album = selectband.topAlbums.find(album=>album.id === albumId);

    if(album == undefined) {
        return undefined;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${album.name}</title>
    <link rel="stylesheet" href="/pages/style.css">
</head>
<body>
    <h1>${album.name}</h1>
    <p>Artist: ${selectband.name}</p>
    <p>Released in: ${album.year}</p>
</body>
</html>`;
};

export default renderAlbumPage;
