const express = require("express");
const publicIp = import('public-ip')

const aboutRouter = express.Router();

aboutRouter.get('/about.json', async (req, res) => {
    const ip = await (await publicIp).publicIpv4();
    res.status(200).send({
        "client": {
            "host": ip
        },
        "server": {
            "current_time": Date.now(),
            "services": [{
                "name": "discord",
                "actions": [{
                    "name": "ping_area_bot" ,
                    "description": "You mentioned AREA bot in your message"
                }],
                "reactions": []
            }, {
                "name": "twitch",
                "actions": [],
                "reactions": [{
                    "name": "get_top10_streamed_games" ,
                    "description": "Receive top 10 streamed games"
                }, {
                    "name": "get_clip_random_game" ,
                    "description": "Receive a clip of a random game"
                }]
            }, {
                "name": "sncf",
                "actions": [],
                "reactions": [{
                    "name": "get_jouneys_stations" ,
                    "description": "Receive journeys between two stations"
                }, {
                    "name": "get_departures_station" ,
                    "description": "Receive next departures of a station"
                }]
            }, {
                "name": "weather",
                "actions": [],
                "reactions": [{
                    "name": "get_weather_lille",
                    "description": "Get actual weather in Lille"
                }, {
                    "name": "get_week_weather_lille",
                    "description": "Get week weather in Lille"
                }, {
                    "name": "get_outfit_advice_lille",
                    "description": "Get outfit advice for weather in Lille"
                }]
            }, {
                "name": "rapidapi",
                "actions": [],
                "reactions": [{
                    "name": "get_random_trivia",
                    "description": "Get random trivia"
                }, {
                    "name": "get_date_lille",
                    "description": "Get actual date and time in Lille"
                }, {
                    "name": "get_timezones_europe",
                    "description": "Get all timezones in Europe"
                }, {
                    "name": "get_short_url",
                    "description": "Get shortened URL"
                }, {
                    "name": "get_qrcode",
                    "description": "Get QRCode from url"
                }]
            }]
        }
    });
});

module.exports = aboutRouter;