// ephemeral = cacher le message aux autres sauf celui qui lance la comande

const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { shortenURL, qrCodeGenerator } = require("../APIRapidAPI/URLRelatedAPIs.js")
const { getRandomTriviaQuestion } = require("../APIRapidAPI/trivia.js")
const { findTimezone, getHourTimeZone } = require("../APIRapidAPI/timezones.js")

function createRapidCommands()
{
    const rapidAPICommands = new SlashCommandBuilder()
        .setName("rapidapi").setDescription("All the RapidAPI related reactions")
            .addSubcommand(subCommand => subCommand.setName("trivia")
                .setDescription("Get a random question with its answer marked as spoiler")
            ) // End of 1er subcommand (trivia)
            .addSubcommand(subCommand => subCommand.setName("gethour")
                .setDescription("Get the date and time at a desired timezone")
                .addStringOption(option => option.setName("area")
                    .setDescription("Give a timezone area like Europe or America")
                    .setRequired(true)
                )
                .addStringOption(option => option.setName("location")
                    .setDescription("Give a timezone location like Paris or London")
                    .setRequired(true)
                )
            ) // End of 2nd subcommand (gethour)
            .addSubcommand(subCommand => subCommand.setName("gettimezones")
                .setDescription("Get all the differents timezones names from a desired area")
                .addStringOption(option => option.setName("area")
                    .setDescription("Give an area from where you want to list the timezones, it can be Paris like Europe or America")
                    .setRequired(true)
                )
            ) // End of 3rd subcommand (gettimezones)
    return (rapidAPICommands);
}

function createUrlCommands()
{
    const rapidAPICommands = new SlashCommandBuilder()
        .setName("url").setDescription("All the URL related reactions")
            .addSubcommand(subCommand => subCommand.setName("shortenurl")
                .setDescription("Shorten a given url")
                .addStringOption(option => option.setName("url")
                    .setDescription("The url to be shortened")
                    .setRequired(true)
                )
            ) // End of 1st subCommand (shortenurl)
            .addSubcommand(subCommand => subCommand.setName("toqrcode")
                .setDescription("Transform an Url or any string into a QR code")
                .addStringOption(option => option.setName("url")
                    .setDescription("The url or phrase to be turned into a QR code")
                    .setRequired(true)
                )
            ) // End of 2nd subCommand (toqrcode)
    return (rapidAPICommands);
}

async function getTimezoneReply(message)
{
    const timezones = await findTimezone('Europe');
    let standard = "";
    let length = 57 + area.length;

    if ((typeof hour) === "string") {
        message.reply({content: timezones, ephemeral: true});
        return;
    }
    timezones.forEach(timezone => {
        if (length + timezone.length + 1 > 1997 || standard.includes("...\n") == true) {
            if (standard.includes("...\n") == false)
                standard += "...\n";
            return;
        }
        standard += timezone + "\n";
        length += timezone.length + 1;
    });
    standard.slice(0, -1);
    message.reply({content: `Here is a list for all the desired timezones in the area Europe: \`\`\`${standard}\`\`\``, ephemeral: true});
}

async function getHourReply(message, params)
{
    const area = 'Europe'
    const location = 'Lille'
    const hour = await getHourTimeZone(area, location);
    let standard = null;

    if ((typeof hour) === "string") {
        message.reply({content: hour, ephemeral: true});
        return;
    }
    date = hour.date.substr(0, hour.date.search("T") + 1);
    time = hour.date.substr(hour.date.search("T") + 1);

    standard = date.substring(8, date.search("T")) + " "
             + date.substring(5, 7) + " "
             + date.substring(0, 4) + " "
             + time.substring(0, 8) + " UTC:"
             + time.substring(time.length - 6) + " Timezone: "
             + hour.timezone;
    message.reply({content: `Here is the desired hour: ${standard}`, ephemeral: true});
}

async function triviaReply(message, params)
{
    const trivia = await getRandomTriviaQuestion();

    if ((typeof trivia) === "string") {
        message.reply({content: trivia, ephemeral: true});
        return;
    }
    message.reply({content: `Theme: ${trivia[0].category}\nQuestion: ${trivia[0].question}\nAnswer: ||${trivia[0].answer}||`, ephemeral: true});
}

async function shortenURLReply(message, params)
{
    if (params.length != 1)
        return message.reply({content: 'Wrong usage. Use @AREA <url>', ephemeral: true});
    const url = params[0];
    const shortenUrl = await shortenURL(url);

    if ((typeof shortenURL) === "string") {
        message.reply({content: shorten, ephemeral: true});
        return;
    }
    message.reply({content: `Here is the shortened URL for the requested url: ${shortenUrl.result_url}`, ephemeral: true});
}

async function qrCodeReply(message, params)
{
    if (params.length != 1)
        return message.reply({content: 'Wrong usage. Use @AREA <url>', ephemeral: true});
    const url = params[0];
    const path = await qrCodeGenerator(url);

    if (path === "Nope") {
        message.reply({content: "Error while transforming the URL", files: ["https://tenor.com/view/404-not-found-error-20th-century-fox-gif-24907780"], ephemeral: true});
        return;
    }
    message.reply({content: `Here is the QR code for the requested url/string: ${url}`, files:[path], ephemeral: true});
}

module.exports.createRapidCommands = createRapidCommands;
module.exports.createUrlCommands = createUrlCommands;
module.exports.triviaReply = triviaReply;
module.exports.getHourReply = getHourReply;
module.exports.getTimezoneReply = getTimezoneReply;
module.exports.shortenURLReply = shortenURLReply;
module.exports.qrCodeReply = qrCodeReply;
