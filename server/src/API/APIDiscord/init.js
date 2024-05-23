require('dotenv').config({path: `./${process.env.APP_ENV}.env`});
const Discord = require('discord.js');              // Déclare l'utilisation des packages Discord
const Rest = require('@discordjs/rest');            // Déclare le module rest pour les commandes /
const { createCommands } = require("./commands.js")

async function initBot()
{
    const commands = createCommands();

    const client = new Discord.Client({
        intents: [
            Discord.GatewayIntentBits.Guilds,
            Discord.GatewayIntentBits.GuildMembers,
            Discord.GatewayIntentBits.GuildMessages,
    ]});

    const rest = new Rest.REST({version: '10'}).setToken(process.env.DISCORD_TOKEN);
    client.login(process.env.DISCORD_TOKEN);

    // await (async () => {
    //     try {
    //         console.log("\nRefreshing slash commands.\n");

    //         const data = await rest.put(Discord.Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands});
    //         console.log("Refresh success\n");
    //     } catch (error) {
    //         console.log('Error\n');
    //         console.error(error);
    //     }
    // }) ();

    return ({rest, client});
}

module.exports.initBot = initBot;
