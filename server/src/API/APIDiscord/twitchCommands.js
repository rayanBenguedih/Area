const Twitch = require('../APITwitch/twitch.js')
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

function createCommands()
{
    const twitchCommands = new SlashCommandBuilder()
        .setName("twitch").setDescription("All the Twitch related actions / reactions")
            .addSubcommand(subCommand => subCommand.setName("getclip")
                .setDescription("Get a random clip from Twitch using the name of a game or the name of a channel")
                .addStringOption(option => option.setName("category").setDescription("Choose between a channel or a game")
                    .setRequired(true)
                    .addChoices(
                        {name: "Channel", value: "channel"},
                        {name: "Game", value: "game"}
                    )
                )
                .addStringOption(option => option.setName("name")
                    .setDescription("Name of the game or the channel")
                    .setRequired(true)
                )
                .addStringOption(option => option.setName("starting_at")
                    .setDescription("Give a starting date for clips retrieving query formated as: YYYY-MM-DD")
                    .setRequired(false)
                )
                .addStringOption(option => option.setName("ending_at")
                    .setDescription("Give an ending date for clips retrieving query formated as: YYYY-MM-DD \/!\\ \"after\" argument required")
                    .setRequired(false)
                )
            ) // End of 1er subcommand (getClip)
            .addSubcommand(subCommand => subCommand.setName("topgame")
                .setDescription("Get the top 10 games streamed on twitch")
            ) // End of 2nd subcommand (topGame)
    return (twitchCommands);
}

function CreateTopGameEmbed(games)
{
    const embed = new EmbedBuilder()
        .setColor("6441A5")
        .setThumbnail(`${games[0].box_art_url.replace("-{width}x{height}", "")}`)
        .setTitle("Twitch current top 10 streamed games")
        .addFields(
            {name: `1: ${games[0].name}`, value: "\u200b"},
            {name: `2: ${games[1].name}`, value: "\u200b"},
            {name: `3: ${games[2].name}`, value: "\u200b"},
            {name: `4: ${games[3].name}`, value: "\u200b"},
            {name: `5: ${games[4].name}`, value: "\u200b"},
            {name: `6: ${games[5].name}`, value: "\u200b"},
            {name: `7: ${games[6].name}`, value: "\u200b"},
            {name: `8: ${games[7].name}`, value: "\u200b"},
            {name: `9: ${games[8].name}`, value: "\u200b"},
            {name: `10: ${games[9].name}`, value: "\u200b"}
        );
    return (embed);
}

async function getClip(message, params)
{
    const random = (min, max) => {return Math.floor(Math.random() * (max - min) + min)};

    const games = await Twitch.getTopGames();
    const randomGame = games[random(0, games.length - 1)].name;
    const clipsList = await Twitch.getClipFromGame(randomGame);
    const selectedClip = clipsList[random(0, clipsList.length - 1)].url;
    message.reply({content: `Voici un clip de ${randomGame}: ${selectedClip}`, ephemeral: false});
}

async function getTopGames(message, params)
{
    const games = await Twitch.getTopGames();

    if (typeof(games) === "string") {
        message.reply({content: games, ephemeral: true});
        return;
    }
    message.reply({embeds: [CreateTopGameEmbed(games)], ephemeral: true});
}

module.exports.getClip = getClip;
module.exports.getTopGames = getTopGames;
module.exports.createCommands = createCommands;
