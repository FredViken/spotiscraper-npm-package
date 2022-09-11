const puppeteer = require('puppeteer');

exports.getStreams = (url) => {
    data = [];
    (async () => {
        const browser = await puppeteer.launch({
            headless: true
        })
        const page = await browser.newPage()
    
        await page.goto(url, {
            waitUntil: 'load'
        });

        page.on('response', async (response) => {
            try{
                const album = await response.json();
                
                if ('name' in album.data.album.tracks.items[0].track){
                    const tracks = album.data.album.tracks.items
                    
                    tracks.forEach(element => {
                        console.log(element.track.name + ' - ' + element.track.playcount);
                        data.push({
                            name: element.track.name,
                            streams: element.track.playcount
                        })
                    });
                    
                    browser.close()
                    console.log(data);
                    return data
    
                
                }
    
            } catch (err){
               
            }
                
        });
        
    })().catch(err => console.error())
    
}
