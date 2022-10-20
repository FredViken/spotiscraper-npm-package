const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

exports.getStreams = async (url, callback) => {
    let data = [];

    const browser = await puppeteer.launch({headless:true, args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage(); 
    await page.goto(url, {waitUntil: 'load'});
    //console.log('Succesfully loaded page');
    //console.log(page.url());

    page.on('response', async (response) => {
        try{
            const album = await response.json();
            /*try{
                console.log(album);
            } catch {
                console.log('nope');
            }*/
            if ('name' in album.data.albumUnion.tracks.items[0].track){
                const tracks = album.data.albumUnion.tracks.items
                
                tracks.forEach((element,key) => {
                    
                    data.push({
                        trackNumber: element.track.trackNumber,
                        name: element.track.name,
                        streams: element.track.playcount,
                        uri: element.track.uri
                    })
                    
                })

                browser.close();
                //console.log('Closing headless browser');
                callback(data)
                
            }
        } catch {
            
        }
    })
        
}

//For testing purposes

// exports.getStreams('https://open.spotify.com/album/21jF5jlMtzo94wbxmJ18aa', (result) => {
//     console.log(result);
// })
