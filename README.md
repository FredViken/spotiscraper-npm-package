## Description

Package includes a simple function that retrieves Spotify stream count given an album url

## Usage

```sh
npm install spotiscrape
```

```js
const spotiScraper = require('spotiscraper);

spotiScraper.getStreams('Spotify album url', (result) => {
    console.log(result);
})

```

URL must be in this format:
"https://open.spotify.com/album/id"

/track and /artist is currently not supported