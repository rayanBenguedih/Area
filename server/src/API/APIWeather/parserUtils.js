const AXIOS = require("axios");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getLocationName(data)
{
    let location = data[2];

    location = location.substring(location.search("observationpoint=\"") + 18);
    location = location.substring(0, location.search("\""));
    return (location);
}

function getTemperature(data, day)
{
    let temperature = data[day + 2];
    let feel = null;

    if (day === 0) {
        feel = temperature.substring(temperature.search("feelslike=\"") + 11);
        temperature = temperature.substring(temperature.search("current temperature=\"") + 21);
    } else {
        feel = temperature.substring(temperature.search("high=\"") + 6);
        temperature = temperature.substring(temperature.search("low=\"") + 5);
    }

    feel = feel.substring(0, feel.search("\""));
    temperature = temperature.substring(0, temperature.search("\""));

    if (day === 0) {
        temperature = `Temperature: ${temperature}°C\nFeels like: ${feel}°C`;
    } else {
        temperature = `Low: ${temperature}°C, High: ${feel}°C`;
    }
    return (temperature);
}

function getSkyStatus(data, day)
{
    let skyStatus = data[day + 2];

    if (day === 0) {
        skyStatus = skyStatus.substring(skyStatus.search("skytext=\"") + 9);
    } else {
        skyStatus = skyStatus.substring(skyStatus.search("skytextday=\"") + 12);
    }
    skyStatus = skyStatus.substring(0, skyStatus.search("\""));
    return (skyStatus);
}

function getDate(data, day)
{
    let date = data[day + 2];

    day = date.substring(date.search("day=\"") + 5);
    day = day.substring(0, day.search("\""));
    date = date.substring(date.search("date=\"") + 6);
    date = date.substring(0, date.search("\""));
    date = date.split('-');
    date = day + ", " + months[date[1] - 1] + " " + date[2] + " " + date[0];

    return (date);
}

function getWindSpeed(data, day)
{
    let wind = data[day + 2];

    if (day === 0) {
        wind = wind.substring(wind.search("winddisplay=\"") + 13);
        wind = wind.substring(0, wind.search("\""));
    } else {
        wind = wind.substring(wind.search("precip=\"") + 8);
        wind = wind.substring(0, wind.search("\""));
    }
    return (wind);
}

function getHumidity(data)
{
    let humidity = data[2];

    humidity = humidity.substring(humidity.search("humidity=\"") + 10);
    humidity = humidity.substring(0, humidity.search("\""));
    return (humidity);
}

module.exports.getLocationName = getLocationName;
module.exports.getTemperature = getTemperature;
module.exports.getSkyStatus = getSkyStatus;
module.exports.getDate = getDate;
module.exports.getWindSpeed = getWindSpeed;
module.exports.getHumidity = getHumidity;
