const { clientInteraction } = require('./APIDiscord/discord.js');
const { startTwitch } = require('./APITwitch/twitch.js');
const { initSNCF } = require('./APISNCF/init.js');
const { initWeather } = require('./APIWeather/init.js');
const { initRapidAPI } = require('./APIRapidAPI/init.js');

async function initAPI()
{
    console.log("\x1b[36m%s\x1b[0m", "\n-------AREA API initialization start--------\n")

    console.log("\x1b[36m%s\x1b[0m", "----------Initializing Twitch API-----------");
    await startTwitch();
    console.log("\x1b[36m%s\x1b[0m", "-----------Twitch API initialized-----------\n");

    console.log("\x1b[36m%s\x1b[0m", "-----------Initializing SNCF API------------");
    await initSNCF();
    console.log("\x1b[36m%s\x1b[0m", "------------SNCI API initialized------------\n");

    console.log("\x1b[36m%s\x1b[0m", "-----------Initializing Weather API------------");
    await initWeather();
    console.log("\x1b[36m%s\x1b[0m", "------------Weather API initialized------------\n");

    console.log("\x1b[36m%s\x1b[0m", "-----------Initializing RapidAPI API------------");
    await initRapidAPI();
    console.log("\x1b[36m%s\x1b[0m", "------------RAPIDAPI API initialized------------\n");


    console.log("\x1b[36m%s\x1b[0m", "----------Initializing Discord bot----------");
    await clientInteraction();

}

module.exports.initAPI = initAPI;
