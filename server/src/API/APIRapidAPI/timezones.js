require('dotenv').config({path: `./${process.env.APP_ENV}.env`});
const AXIOS = require("axios");

async function findTimezone(zone)
{
    const timezones = await AXIOS.get(`https://world-time2.p.rapidapi.com/timezone`, {
        headers: {
            'X-RapidAPI-Key': `${process.env.RAPIDAPI}`,
            'X-RapidAPI-Host': 'world-time2.p.rapidapi.com'
        }
    }).then(res => {
        let zones = [];
        zone = zone.toLowerCase();
        res.data.forEach(timezone => {
            if (timezone.toLowerCase().includes(zone)) {
                zones.push(timezone);
            }
        });
        return (zones);
    }).catch(error => {
        console.log(error);
        return ("Error while gathering the timezones");
    });

    return (timezones);
}

async function getHourTimeZone(area, location)
{
    const timezones = await AXIOS.get(`https://world-time2.p.rapidapi.com/timezone/${area}/${location}`, {
        headers: {
            'X-RapidAPI-Key': `${process.env.RAPIDAPI}`,
            'X-RapidAPI-Host': 'world-time2.p.rapidapi.com'
        }
    }).then(res => {
        return ({date: res.data.datetime, timezone: res.data.timezone});
    }).catch(error => {
        console.log(error);
        return (`Error while gathering the hour with the parameters ${area} ${location}`);
    });

    return (timezones);
}

module.exports.findTimezone = findTimezone;
module.exports.getHourTimeZone = getHourTimeZone;
