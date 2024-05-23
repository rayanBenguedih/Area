require('dotenv').config({path: `./${process.env.APP_ENV}.env`});
const AXIOS = require("axios")

async function initTwitchAPI()
{
    if (await getToken() !== 200) {
        console.log('Error, cannot get the identification token');
        return;
    }

    // console.log(getTopGames());
    // getClipFromGame('Counter-Strike: Global offensive', "2021-12-31", "2022-12-31");
    // getClipFromStreamer('pierrennette');
}

async function getToken()
{
    const status = await AXIOS.post('https://id.twitch.tv/oauth2/token', {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
    }).then(res => {
        console.log('Twitch token status code: ' + res.status);
        process.env.TOKEN = res.data.access_token;
        return (res.status);
    }).catch(error => {
        console.log(error);
        return (error.status);
    });
    return (status);
}

// Authorization is always Bearer
// Careful on the get request and the header
// Peut-être utile du genre si un jeu est dans le top 10 dans ce cas ->>>
async function getTopGames()
{
    const result = await AXIOS.get('https://api.twitch.tv/helix/games/top?first=10', {
        headers: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID
    }}).then(res => {
        return(res);
    }).catch(error => {
        console.log(error);
        return("ERROR");
    });

    if (result === "ERROR")
        return ("Error: cannot retrieve top 10 streamed games from Twitch");
    return (result.data.data);
}

async function getUserDetails(username)
{
    const result = await AXIOS.get('https://api.twitch.tv/helix/users?login=' + username, {
        headers: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID
    }}).then(res => {
        return (res);
    }).catch(error => {
        console.log(error);
        return (error);
    });

    if (result.status === 200)
        return (result.data);
    return ('ERROR');
}

async function getGameByName(gameName)
{
    const result = await AXIOS.get('https://api.twitch.tv/helix/games?name=' + gameName, {
        headers: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID
    }}).then(res => {
        return (res);
    }).catch(error => {
        console.log(error);
        return (res);
    });

    if (result.status === 200)
        return (result.data);
    return ("ERROR");
}

async function getClipFromGame(gameName, startDate = undefined, endDate = undefined)
{
    const gameInfo = await getGameByName(gameName);
    var period = '';

    if (startDate != undefined) {
        period = `&started_at=${startDate}T00:00:00Z`;
        if (endDate != undefined) {
            period += `&ended_at=${endDate}T00:00:00Z`;
        }
    }

    const result = await AXIOS.get('https://api.twitch.tv/helix/clips?game_id=' + gameInfo.data[0].id + period + '&first=100', {
        headers: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID
    }}).then(res => {
        return (res);
    }).catch(error => {
        console.log(error);
        return (error);
    });

    if (result.status === 200)
        return (result.data.data);
    return ('ERROR');
}

async function getClipFromStreamer(streamerName, startDate = undefined, endDate = undefined)
{
    const streamerInfo = await getUserDetails(streamerName);
    var period = '';

    if (streamerInfo.data.length === 0) {
        return ("STREAMER NOT FOUND")
    }
    if (startDate != null) {
        period = `&started_at=${startDate}T00:00:00Z`;

        if (endDate != null) {
            period += `&ended_at=${endDate}T00:00:00Z`;
        }
    }

    const result = await AXIOS.get('https://api.twitch.tv/helix/clips?broadcaster_id=' + streamerInfo.data[0].id + period + '&first=100', {
        headers: {
            'Authorization': `Bearer ${process.env.TOKEN}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID
    }}).then(res => {
        return (res);
    }).catch(error => {
        console.log(error);
        return (error);
    });

    if (result.status === 200)
        return (result.data.data);
    return ('ERROR in request');
}

module.exports.getClipFromStreamer = getClipFromStreamer;
module.exports.getClipFromGame = getClipFromGame;
module.exports.getTopGames = getTopGames;
module.exports.startTwitch = initTwitchAPI;
