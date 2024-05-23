function createDurationFromSeconds(seconds)
{
    let res = new Date(seconds * 1000).toISOString().slice(11, 16);

    res = res.replace(":", "h")
    res += 'm';
    return (res);
}

function formatSNCFTime(time)
{
    time = time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6, 11) + ':' + time.substring(11, 13) + ':' + time.substring(13);
    return (time);
}

function getWaitingTime(journeyDetails)
{
    let lastWaiting = 0;

    for (let i = 0; i < journeyDetails.length; i++) {
        if (journeyDetails[i].type !== "waiting") {
            journeyDetails[i].departureTime = formatSNCFTime(journeyDetails[i].departureTime);
            journeyDetails[i].arrivalTime = formatSNCFTime(journeyDetails[i].arrivalTime);
        } else {
            lastWaiting = i;
        }
        if (lastWaiting > 0 && lastWaiting != i) {
            // This line is to get the time between the time they arrived at the station and the time when the train is leaving the station
            // Will proc only if they need to do a transfert
            journeyDetails[lastWaiting].duration = new Date(Date.parse(journeyDetails[i].departureTime) - Date.parse(journeyDetails[lastWaiting - 1].arrivalTime)).toISOString().slice(11, 16);
            journeyDetails[lastWaiting].duration = journeyDetails[lastWaiting].duration.replace(':', 'h');
            journeyDetails[lastWaiting].duration += 'm';
            lastWaiting = 0;
        }
    }
    return (journeyDetails);
}

module.exports.getWaitingTime = getWaitingTime;
module.exports.createDurationFromSeconds = createDurationFromSeconds;
module.exports.formatSNCFTime = formatSNCFTime
