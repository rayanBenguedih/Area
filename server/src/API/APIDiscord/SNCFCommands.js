const { getJourney, parseJourney } = require("../APISNCF/journey.js");
const { getNextDepartures } = require("../APISNCF/stations.js");
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

function CreateJourneyEmbed(journey, departure, arrival)
{
    let embed = new EmbedBuilder()
        .setColor("960018")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/d/db/200914_LOGO_SNCF_GC_RGB.png")
        .setTitle(`Journey details between ${departure} and ${arrival}`);

    journey.forEach(step => {
        if (step.type === "waiting")
            embed.addFields({name: 'Waiting', value: `Duration: ${step.duration}`});
        else
            embed.addFields({name: step.type, value: `Station: ${step.departureStation}\nDirection: ${step.direction}\n Arrival station: ${step.arrivalStation}\n${step.type}: ${step.transportId}\nDeparture hour: ${step.departureTime}\nArrival hour: ${step.arrivalTime}\nDuration: ${step.duration}`});
    });
    return (embed);
}

function CreateStationEmbed(departures, station)
{
    let embed = new EmbedBuilder()
        .setColor("960018")
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/d/db/200914_LOGO_SNCF_GC_RGB.png")
        .setTitle(`Next departures in station ${station}`);

    departures.forEach(step => {
        embed.addFields({name: `Direction: ${step.direction}`, value: `Transport type: ${step.type}\nId: ${step.transportId}\n Departure date: ${step.nextDeparture.replace('T', ' ')}`});
    });
    return (embed);
}

function createCommands()
{
    const SNCFCommands = new SlashCommandBuilder()
        .setName("sncf").setDescription("All the sncf related actions / reactions")
            .addSubcommand(subCommand => subCommand.setName("getjourney")
                .setDescription("Retrieve all the details of a journey from a train station A to a train station B")
                .addStringOption(option => option.setName("departure").setDescription("Name of the departure station")
                    .setRequired(true)
                )
                .addStringOption(option => option.setName("arrival")
                    .setDescription("Name of the arrival station")
                    .setRequired(true)
                )
            ) // End of 1er subcommand (getJourney)
            .addSubcommand(subCommand => subCommand.setName("getnextdepartures")
                .setDescription("Retrieve all the next departures from a train station A to a train station B")
                .addStringOption(option => option.setName("station").setDescription("Name of the departure station")
                    .setRequired(true)
                )
            ) // End of 1er subcommand (getJourney)
    return (SNCFCommands);
}

async function nextDeparture(message, params)
{
    const station = params[1] ? params[1] : 'Lille Flandres';
    const departures = await getNextDepartures(station);

    if ((typeof departures) === "string")
        message.reply({content: departures, ephemeral: true});
    else
        message.reply({content: "", embeds: [CreateStationEmbed(departures, station)], ephemeral: true});
}

async function journeyDetails(message, params)
{
    const departure = params[1] ? params[1] : 'Lille Flandres';
    const arrival = params[2] ? params[2] : 'Paris Gare du Nord';
    const journey = await getJourney(departure, arrival);

    if ((typeof journey) === "string")
        message.reply({content: journey, ephemeral: true});
    else {
        let parsedJourney = parseJourney(journey[0].sections);
        message.reply({content: "", embeds: [CreateJourneyEmbed(parsedJourney, departure, arrival)], ephemeral: true});
    }
}

module.exports.createCommands = createCommands;
module.exports.journeyDetails = journeyDetails;
module.exports.nextDeparture = nextDeparture;
