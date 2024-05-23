require('dotenv').config({path: `./${process.env.APP_ENV}.env`});
const AXIOS = require("axios")
const { findTimezone } = require('./timezones.js');

async function initAPI()
{

    if (await auth() !== 200) {
        console.log('Error, cannot authenticate');
        return;
    }

    console.log("RapidAPI request result: 200");
}

async function auth()
{
    const status = await AXIOS.get('https://trivia-by-api-ninjas.p.rapidapi.com/v1/trivia', {
        headers: {
            'X-RapidAPI-Key': `${process.env.RAPIDAPI}`,
            'X-RapidAPI-Host': 'trivia-by-api-ninjas.p.rapidapi.com'
    }}).then(res => {
        return (res);
    }).catch(err => {
        console.log(err);
        return (err);
    });
    return (status.status)
}

module.exports.initRapidAPI = initAPI;
