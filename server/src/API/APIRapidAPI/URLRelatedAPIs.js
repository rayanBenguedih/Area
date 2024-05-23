require('dotenv').config({path: `./${process.env.APP_ENV}.env`});
const AXIOS = require("axios");
const OS = require("os");
const FS = require("fs");

async function shortenURL(url)
{
    const encodedParams = new URLSearchParams();
    if (url.startsWith("http://") == false && url.startsWith("https://") == false) {
        url = "http://" + url;
    }
    encodedParams.append("url", url);

    const shortenLink = await AXIOS.post('https://hideuri.com/api/v1/shorten',
        encodedParams, {
    }).then(res => {
        return (res.data);
    }).catch(error => {
        console.log(error);
        return ("Error while shortening the link");
    });

    return (shortenLink);
}

async function qrCodeGenerator(url)
{
    let path = OS.tmpdir();
    path += "/" + "QRCode-" + Math.floor(Math.random() * 10000000000000) + ".png";
    let test = FS.createWriteStream(path);

    const qrCode = await AXIOS.get(
        `https://api.acme.codes/new?msg=${url}&format=png&xres=400&yres=400&eyeColor=0000aa`, {
        responseType: 'stream'
    });
    qrCode.data.pipe(test);

    return new Promise((resolve, reject) => {
        test.on('finish', resolve(path));
        test.on('error', reject('Nope'));
    });
}

module.exports.shortenURL = shortenURL;
module.exports.qrCodeGenerator = qrCodeGenerator
