require('dotenv').config({path: `./${process.env.APP_ENV}.env`});
const Discord = require('discord.js');
const { initBot } = require('./init.js');
const db = require('../../config/db.js');

const TwitchCommands = require('./twitchCommands.js');
const SNCFCommands = require('./SNCFCommands.js');
const WeatherCommands = require('./weatherCommands.js');
const RapidAPICommands = require('./rapidAPICommands.js');

const reactions = {
    "twitch": {
        "Receive top 10 streamed games": TwitchCommands.getTopGames,
        "Receive clip of a random game": TwitchCommands.getClip
    },
    "sncf": {
        "Get journeys between two stations": SNCFCommands.journeyDetails,
        "Get next departures of a station": SNCFCommands.nextDeparture
    },
    "weather": {
        "Get actual weather in Lille": WeatherCommands.oneDayReply,
        "Get week weather in Lille": WeatherCommands.weekDayReply,
        "Get outfit advice for weather in Lille": WeatherCommands.outfitReply
    },
    "rapidapi": {
        "Get random trivia": RapidAPICommands.triviaReply,
        "Get actual date and time in Lille": RapidAPICommands.getHourReply,
        "Get all timezones in Europe": RapidAPICommands.getTimezoneReply,
        "Get shortened URL": RapidAPICommands.shortenURLReply,
        "Get QRCode from url": RapidAPICommands.qrCodeReply,
    }
};

async function clientInteraction()
{
    const {rest, client} = await initBot();

    client.on("ready", async () => {
        console.log(`Logged in as ${client.user.tag}!`);
        console.log("\x1b[36m%s\x1b[0m", "-----------Discord bot initialized----------");
    });

    client.on('messageCreate', (message) => {
        let params = message.content.split(' ');

        if (message.mentions.users.has(client.user.id) == false || message.author.bot)
            return;
        if (/<@[A-Za-z0-9]+>/i.test(params[0]) == false)
            return message.reply({content: 'Wrong message format, use : @AREA [params]', ephemeral: true});
        params.shift();
        db.query('SELECT * FROM users WHERE discordUserId=?', [message.author.id], (err, areaUsers) => {
            if (err)
                throw err;
            if (areaUsers.length === 0) {
                message.reply({content: "You don't own an account on AREAProject, sorry :/", ephemeral: false});
                return;
            }
            db.query('SELECT * FROM areas WHERE userId=?', [areaUsers[0].id], (err, userTargetedAreas) => {
                if (err)
                    throw err;
                if (userTargetedAreas.length === 0) {
                    message.reply({content: "You don't have any AREA that use Discord.", ephemeral: false});
                    return;
                }
                for (let area of userTargetedAreas) {
                    if (reactions[area.reactionService][area.reactionLabel])
                        reactions[area.reactionService][area.reactionLabel].call(null, message, params);
                }
            });
        });
    });

    client.on(Discord.Events.ShardError, error => {
        console.error('A websocket connection encountered an error:', error);
    });
}

module.exports.clientInteraction = clientInteraction;
