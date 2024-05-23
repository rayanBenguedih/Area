require('dotenv').config({path: `./${process.env.APP_ENV}.env`});
const AXIOS = require("axios")
const { formatSNCFTime } = require('./utils.js')

async function getStationsPage(pageNb)
{
    const ret = await AXIOS.get(`https://api.sncf.com/v1/coverage/sncf/stop_areas?start_page=${pageNb}`, {
        headers: {
            'Authorization': `${process.env.SNCF_TOKEN}`
    }});

    return (ret.data);
}

async function getStationsDeparturePage(stationId, pageNb)
{
    const nextDepartures = await AXIOS.get(`https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationId}/departures?start_page=${pageNb}`, {
        headers: {
            'Authorization': `${process.env.SNCF_TOKEN}`
    }});

    return (nextDepartures.data);
}

async function getNextDepartures(desiredStation)
{
    const stationId = await searchForStation(desiredStation.toLowerCase()).then(res => {if (res != undefined) return (res.id); return (null);});
    let allDepartures = null;
    let nextDepartures = null;
    let totPages = 0;
    let stop = [];

    if (stationId === null)
        return (`Station '${departureStation}' not found`);

    nextDepartures = await getStationsDeparturePage(stationId, 0);
    totPages = Math.round(nextDepartures.pagination.total_result / nextDepartures.pagination.items_per_page);
    allDepartures = nextDepartures.departures;

    for (let pageNb = 1; pageNb < totPages; pageNb++) {
        pageInfo = await getStationsDeparturePage(stationId, pageNb);

        if (pageInfo.hasOwnProperty('stop_areas') == true)
            allDepartures.push(pageInfo.departures);
    }

    for (let i = 0; i < allDepartures.length; i++) {
        stop.push({
            type: allDepartures[i].display_informations.commercial_mode,
            transportId: allDepartures[i].display_informations.headsign,
            direction: allDepartures[i].display_informations.direction,
            nextDeparture: formatSNCFTime(allDepartures[i].stop_date_time.departure_date_time)
        });
    }

    return (stop);
}

async function searchForStation(desiredStation)
{
    let totPages = 0;
    let requestResult = null;
    let pageInfo = null;
    let tmp = await getStationsPage(0);

    totPages = Math.round(tmp.pagination.total_result / tmp.pagination.items_per_page);
    for (let pageNb = 0; pageNb < totPages && requestResult == null; pageNb++) {
        pageInfo = await getStationsPage(pageNb);

        if (pageInfo.hasOwnProperty('stop_areas') == true)
            requestResult = pageInfo.stop_areas.find(station => station.name.toLowerCase().includes(desiredStation));
    }
    return (requestResult);
}

module.exports.searchForStation = searchForStation;
module.exports.getNextDepartures = getNextDepartures;
