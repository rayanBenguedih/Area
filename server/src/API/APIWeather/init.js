const AXIOS = require("axios");
const { weatherRequest } = require('./requests.js');

async function initAPI()
{
    if (await auth() !== 200) {
        console.log('Error, cannot connect');
        return;
    }

    console.log("Weather request result: 200");
}

async function auth()
{
    const status = await AXIOS.get(`http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=C&culture=en-US&weasearchstr=Lille`)
    .then(result => {
        return (result);
    }).catch(err => {
        console.log(err);
        return (err);
    });

    return (status.status);
}

module.exports.initWeather = initAPI;
