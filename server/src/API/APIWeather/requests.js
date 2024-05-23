const AXIOS = require("axios");
const Parsers = require('./parserUtils.js');

async function weatherRequest(location)
{
    const ret = await AXIOS.get(`http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=C&culture=en-US&weasearchstr=${location}`)
    .then(result => {
        result = result.data.split('>');
        return (result);
    }).catch(err => {
        console.log(err);
        return (err);
    });

    if (ret.length === 1) {
        return (`Error while getting the city informations of: \"${location}\", please make sure the city's name is in English.`);
    }

    let test = [];

    for (let i = 0; i < 5; i++) {
        test.push({
            status: Parsers.getSkyStatus(ret, i),
            location: Parsers.getLocationName(ret),
            date: Parsers.getDate(ret, i),
            skyStatus: Parsers.getSkyStatus(ret, i),
            temperature: Parsers.getTemperature(ret, i),
            wind: Parsers.getWindSpeed(ret, i),
            humidity: Parsers.getHumidity(ret)
        });
    }
    return (test);
}

module.exports.weatherRequest = weatherRequest;
