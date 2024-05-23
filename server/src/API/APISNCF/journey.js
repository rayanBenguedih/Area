const SNCFUtils = require("./utils.js")
const {searchForStation} = require("./stations.js")
const AXIOS = require("axios");

function parseJourney(journey)
{
    var journeyDetails = [];

    for (let i = 1; i < journey.length - 1; i++) {
        if (journey[i].hasOwnProperty("display_informations") == true) {
            journeyDetails.push({
                type: journey[i].display_informations.commercial_mode,
                transportId: journey[i].display_informations.trip_short_name,
                direction: journey[i].display_informations.direction,
                departureStation: journey[i].from.stop_point.label,
                arrivalStation: journey[i].to.stop_point.label,
                departureTime: journey[i].departure_date_time,
                arrivalTime: journey[i].base_arrival_date_time,
                duration: SNCFUtils.createDurationFromSeconds(journey[i].duration)
            });
        } else if (journey[i].type === "waiting") {
            journeyDetails.push({
                type: journey[i].type,
                duration: SNCFUtils.createDurationFromSeconds(journey[i].duration)
            })
        }
    }
    journeyDetails = SNCFUtils.getWaitingTime(journeyDetails);
    return (journeyDetails);
}

async function getJourney(departureStation, arrivalStation, departureDate = "")
{
    let departureID = await searchForStation(departureStation.toLowerCase()).then(res => {if (res != undefined) return (res.id); return (null);});
    let arrivalId = await searchForStation(arrivalStation.toLowerCase()).then(res => {if (res != undefined) return (res.id); return (null);});
    let data = null;

    if (departureDate !== "") {
        departureDate = `&datetime=${departureDate}`;
    }
    if (departureID != null && arrivalId != null) {
        data = await AXIOS.get(`https://api.sncf.com/v1/coverage/sncf/journeys?from=${departureID}&to=${arrivalId}${departureDate}`, {
            headers: {
                'Authorization': `${process.env.SNCF_TOKEN}`
        }});
        if (data.data.hasOwnProperty('error') == true) {
            return (`'${departureStation}' - '${arrivalStation}': ${data.data.error.message}`);
        }
        return (data.data.journeys);
    }
    if (departureID === null)
        departureID = `Station '${departureStation}' not found`;
    else {
        departureID = "";
    }
    if (arrivalId === null)
        arrivalId = `Station '${arrivalStation}' not foud`;
    else
        arrivalId = "";

    if (departureID[0] === 'S' && arrivalId[0] === 'S')
        return (`${departureID}\n${arrivalId}`);
    else
        return (`${departureID}${arrivalId}`);
    return (undefined);
}

module.exports.getJourney = getJourney;
module.exports.parseJourney = parseJourney;
