// ephemeral = cacher le message aux autres sauf celui qui lance la comande

const TwitchCommands = require('./twitchCommands.js');
const SNCFCommands = require('./SNCFCommands.js');
const WeatherCommands = require('./weatherCommands.js');
const RapidAPICommands = require('./rapidAPICommands.js');

function createCommands()
{
    const commands = [
        TwitchCommands.createCommands(),
        SNCFCommands.createCommands(),
        WeatherCommands.createCommands(),
        RapidAPICommands.createRapidCommands(),
        RapidAPICommands.createUrlCommands()
    ].map(command => command.toJSON());

    return (commands);
}

async function ManageCommands(command)
{
    if (command.isChatInputCommand() == false)
        return;
    if (command.commandName === "twitch") {
        if (command.options.getSubcommand() === "getclip") {
            await TwitchCommands.getClip(command);
            return;
        } else if (command.options.getSubcommand() === "topgame") {
            await TwitchCommands.getTopGames(command);
            return;
        } else {
            command.reply({content: "https://tenor.com/view/404-not-found-error-20th-century-fox-gif-24907780", ephemeral: true});
            return;
        }
    } else if (command.commandName === "sncf") {
        command.reply({content: "Please wait while we're gathering the journey", ephemeral: true});
        if (command.options.getSubcommand() === "getjourney") {
            await SNCFCommands.journeyDetails(command);
            return;
        } else {
            await SNCFCommands.nextDeparture(command);
            return;
        }
    } else if (command.commandName === "weather") {
        await command.reply({content: "Please wait while we're gathering the weather", ephemeral: true});
        if (command.options.getSubcommand() === "getweather") {
            await WeatherCommands.oneDayReply(command);
            return;
        } else if (command.options.getSubcommand() === "getforecast") {
            await WeatherCommands.weekDayReply(command);
            return;
        } else {
            await WeatherCommands.outfitReply(command);
            return;
        }
    } else if (command.commandName === "rapidapi") {
        await command.reply({content: "Please wait while we're gathering the informations", ephemeral: true});
        if (command.options.getSubcommand() === "trivia") {
            await RapidAPICommands.triviaReply(command);
            return;
        } else if (command.options.getSubcommand() === "gethour") {
            await RapidAPICommands.getHourReply(command);
            return;
        } else {
            await RapidAPICommands.getTimezoneReply(command);
            return;
        }
    } else if (command.commandName === "url") {
        await command.reply({content: "Please wait while we're threatening the url", ephemeral: true});
        if (command.options.getSubcommand() === "shortenurl") {
            await RapidAPICommands.shortenURLReply(command);
            return;
        } else {
            await RapidAPICommands.qrCodeReply(command);
            return;
        }
    }
    command.reply({content: "https://tenor.com/view/404-not-found-error-20th-century-fox-gif-24907780", ephemeral: true});
}

module.exports.ManageCommands = ManageCommands;
module.exports.createCommands = createCommands;
