require('dotenv').config({path: `./src/API/APIWeather/weather.env`});
const AXIOS = require("axios");

const _picList = ["5etmoins.jpg", "neige.jpg", "pluie5etmoins.jpg", "pluie15-5.jpg", "normal15-5.jpg", "pluie15-20.jpg", "soleil15-20.jpg", "20+.jpg"];

// Récupère le code couleur
function getColor(status)
{
    var color = null;

    switch (status) {
        case "Sunny":
            color = process.env.SUNCOL
            break;
        case "Partly Sunny": case "Mostly Sunny":
            color = process.env.PARTSUNCOL
            break;
        case "Cloudy": case "Partly Cloudy": case "Mostly Clear":
            color = process.env.CLOUDYCOL
            break;
        case "Snow": case "Fog":
            color = process.env.SNOWCOL
            break;
        case "Small Rain": case "Rain": case "Rain Showers":
            color = process.env.RAINCOL
            break;
        default:
            console.log("Color: " + status);
            color = process.env.DEFAULTCOL
    }
    return (color);
}

// Récupère l'image (remplacer le return par un objet avec la couleur et l'image)
function getImage(status)
{
    var ret = null;

    switch (status) {
        case "Sunny": case "Mostly Sunny":
            ret = process.env.SUNIMG
            break;
        case "Partly Sunny": case "Clair":
            ret = process.env.PARTSUNIMG
            break;
        case "Cloudy": case "Partly Cloudy": case "Mostly Clear":
            ret = process.env.CLOUDYIMG
            break;
        case "Fog":
            ret = process.env.FOGIMG
            break;
        case "Snow":
            ret = process.env.SNOWIMG
            break;
        case "Small Rain":
            ret = process.env.SMALLRAINIMG
            break;
        case "Rain":
            ret = process.env.RAINIMG
            break;
        case "Rain Showers":
            ret = process.env.BIGRAINIMG
            break;
        default:
            console.log("Image: " + status)
            ret = process.env.DEFAULTIMG
    }
    return (ret);
}

function getOutfitReply(temperature, status)
{
    temperature = temperature.substring(temperature.search(' ') + 1);
    temperature = temperature.substring(0, temperature.search('°'));
    temperature = parseInt(temperature);
    if (status == "Snow") {
        text = "The weasel wears a hat, pants (with boxer shorts because it should not be abused), warm shoes, and a big coat.";
        pic = process.env.OUTFITPATH + _picList[1];
        return (text, pic);
    }

    if (temperature < 5) {
        if (status.includes("Rain")) {
            text = "The weasel wears pants, warm shoes, and a big coat and carries her umbrella.";
            pic = process.env.OUTFITPATH + _picList[2];
        } else {
            text = "The weasel is wearing pants, warm shoes, and a heavy coat.";
            pic = process.env.OUTFITPATH + _picList[0];
        }
    } else if (temperature < 15) {
        if (status.includes("Rain")) {
            text = "The weasel wears trousers, shoes, and a sweatshirt and carries her umbrella.";
            pic = process.env.OUTFITPATH + _picList[3];
        } else {
            text = "The weasel is wearing pants, shoes, and a sweatshirt.";
            pic = process.env.OUTFITPATH + _picList[4];
        }
    } else if (temperature <= 20) {
        if (status.includes("Rain")) {
            text = "The weasel pants, tap socks, a T-shirt, and takes his umbrella.";
            pic = process.env.OUTFITPATH + _picList[5];
        } else {
            text = "The weasel is wearing shorts, tap socks, and a T-shirt.";
            pic = process.env.OUTFITPATH + _picList[6];
        }
    } else {
        text = "The weasel wears a T-shirt and a cap. She shaved to be a little less hot.";
        pic = process.env.OUTFITPATH + _picList[7];
    }
    return ({text, pic});
}

module.exports.getColor = getColor;
module.exports.getImage = getImage;
module.exports.getOutfitReply = getOutfitReply;
