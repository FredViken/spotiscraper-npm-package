const puppeteer = require('puppeteer');

exports.getStreams = async (url, callback) => {
    let data = [];
    let done = false;

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'load'});

    page.on('response', async (response) => {
        try{
            const album = await response.json();
            if ('name' in album.data.album.tracks.items[0].track){
                const tracks = album.data.album.tracks.items
                    
                tracks.forEach((element,key) => {
                    
                    data.push({
                        name: element.track.name,
                        streams: element.track.playcount,
                        uri: element.track.uri
                    })
                    
                })

                browser.close();
                callback(data)
                
            }
        } catch {

        }
    })
        
}

exports.getStreams('https://open.spotify.com/album/21jF5jlMtzo94wbxmJ18aa', (val) => {
    console.log(val);
    
})
    


//console.log('y=' + y);

//console.log('a= ' + ('https://open.spotify.com/album/21jF5jlMtzo94wbxmJ18aa'));