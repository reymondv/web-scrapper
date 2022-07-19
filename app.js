const express = require('express');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');


const PORT = process.env.port || 3000;

const website = 'https://news.sky.com';

try{
    axios(website).then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const className = ".sdc-site-tile__headline"; //class name

        let content = [];

        $(className, html).each(function () {
            const title = $(this).text();
            const url = $(this).find('a').attr('href');

            content.push({
                title,
                url,
            });

            app.get('/', (req, res) => {
                res.json(content);
            });
        });
    });
} catch(error) {
    console.log(error, error.message);

}

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
})