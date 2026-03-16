import express from 'express'
const planets = (await import('npm-solarsystem')).default;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

// routes
// root

app.get('/', async(req, res) => {
    try {    
        let url ="https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        let data = await response.json();

        let randomIndex = Math.floor(Math.random() * 50);

        let image = data.hits[randomIndex].webformatURL;

        res.render('home.ejs', {image});
    } catch (err) {
        console.log(err);
    }
});

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${planet}`]();
    res.render('planet.ejs', { planetInfo, planet });
});

app.get('/nasaPod', async(req, res) => {
    try {    
        let url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD`;

        console.log(url);

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        let data = await response.json();

        // let randomIndex = Math.floor(Math.random() * 50); // data.hits[0].length

        // let NasaImage = data.hits[randomIndex].webformatURL;
        let NasaImage = data.url;


        console.log(`\n\n======================${NasaImage}======================\n\n`);

        res.render('nasaPod.ejs', {NasaImage});
    } catch (err) {
        console.log(err);
    }
});

app.get('/otherSpaceBodies', (req, res) => {
    let planet = req.query.planet;
    let objectInfo = planets[`get${planet}`]();
    res.render('otherSpaceBodies.ejs', { objectInfo, planet });
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});