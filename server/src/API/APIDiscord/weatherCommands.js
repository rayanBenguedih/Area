// ephemeral = cacher le message aux autres sauf celui qui lance la comande

const { weatherRequest } = require('../APIWeather/requests.js');
const WeatherUtils = require('../APIWeather/utils.js');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

function createCommands()
{
    const weatherCommands = new SlashCommandBuilder()
        .setName("weather").setDescription("All the Weather related actions / reactions")
            .addSubcommand(subCommand => subCommand.setName("getweather")
                .setDescription("Get the weather details of the day at the desired location")
                .addStringOption(option => option.setName("location")
                    .setDescription("Give a location to get the weather details")
                    .setRequired(true)
                )
            ) // End of 1er subcommand (weather)
            .addSubcommand(subCommand => subCommand.setName("getforecast")
                .setDescription("Get the weather forecast for the 5 next days at the desired location")
                .addStringOption(option => option.setName("location")
                    .setDescription("Give a location to get the weather forecast")
                    .setRequired(true)
                )
            ) // End of 2nd subcommand (forecast)
            .addSubcommand(subCommand => subCommand.setName("whattowear")
                .setDescription("Get an outfit suggestion condidering the weather details at the desired location")
                .addStringOption(option => option.setName("location")
                    .setDescription("Give a location from where you want your outfit suggestion")
                    .setRequired(true)
                )
            ) // End of 3rd subcommand (whattowear)

    return (weatherCommands);
}

function createOneDayEmbed(weather)
{
    const reply = new EmbedBuilder()
        .setColor(WeatherUtils.getColor(weather[0].status))
        .setTitle(`Weather at ${weather[0].location}`)
        .addFields(
            {name: "Date", value: weather[0].date},
            {name: "Sky", value: weather[0].skyStatus},
            {name: "Temperature", value: weather[0].temperature},
            {name: "Wind", value: weather[0].wind},
            {name: "Humidity", value: weather[0].humidity}
        )
        .setImage(WeatherUtils.getImage(weather[0].status));
    return (reply);
}

function createWeekDayEmbed(weather)
{
    const reply = new EmbedBuilder()
        .setColor(WeatherUtils.getColor(weather[0].status))
        .setTitle(`Weather at ${weather[0].location}`)
        .addFields(
            {name: `Date:  ${weather[0].date}`, value: "\u200b"},
            {name: "Sky", value: `${weather[0].skyStatus}`, inline: true},
            {name: "Temperature", value: `${weather[0].temperature}`, inline: true},
            {name: "Wind", value: `${weather[0].wind}`, inline: true},
            {name: `Humidity:  ${weather[0].humidity}%`, value: "\u200b", inline: true}
        );
    for (let i = 1; i < 5; i++) {
        reply.addFields(
            {name: `Date:  ${weather[i].date}`, value: "\u200b"},
            {name: "Sky", value: `${weather[i].skyStatus}`, inline: true},
            {name: "Temperature", value: `${weather[i].temperature}`, inline: true},
            {name: `Precipitation:  ${weather[i].wind}`, value: `\u200b`, inline: true}
        );

    }
    return (reply);
}

async function oneDayReply(message, params)
{
    const weather = await weatherRequest("Lille");

    if ((typeof weather) === "string")
        return message.reply({content: weather, ephemeral: true});
    message.reply({content: "", embeds:[createOneDayEmbed(weather)], ephemeral: true});
}

async function weekDayReply(message, params)
{
    const location = 'Lille';
    const weather = await weatherRequest(location);

    if ((typeof weather) === "string") {
        message.reply({content: weather, ephemeral: true});
        return;
    }
    message.reply({content: "", embeds:[createWeekDayEmbed(weather)], ephemeral: true});
}

async function outfitReply(message, params)
{
    const location = 'Lille';
    const weather = await weatherRequest(location);
    const {text, pic} = WeatherUtils.getOutfitReply(weather[0].temperature, weather[0].status);

    if ((typeof weather) === "string") {
        message.reply({content: weather, ephemeral: true});
        return;
    }
    message.reply({content: text, files:[pic], ephemeral: true});
}

module.exports.oneDayReply = oneDayReply;
module.exports.weekDayReply = weekDayReply;
module.exports.outfitReply = outfitReply;
module.exports.createCommands = createCommands;
