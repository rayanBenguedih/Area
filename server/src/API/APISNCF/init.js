require('dotenv').config({path: `./${process.env.APP_ENV}.env`});
const AXIOS = require("axios")

async function initAPI()
{
    if (await auth() !== 200) {
        console.log('Error, cannot authenticate');
        return;
    }

    console.log("SNCF request result: 200");
}

async function auth()
{
    status = await AXIOS.get('https://api.sncf.com/v1/coverage/sncf/stop_areas?start_page=0', {
        headers: {
            'Authorization': `${process.env.SNCF_TOKEN}`
    }});
    return (status.status)
}

module.exports.initSNCF = initAPI;
