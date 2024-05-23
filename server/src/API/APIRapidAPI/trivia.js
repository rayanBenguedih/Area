require('dotenv').config({path: `./${process.env.APP_ENV}.env`});
const AXIOS = require("axios")

async function getRandomTriviaQuestion()
{
    const question = await AXIOS.get('https://trivia-by-api-ninjas.p.rapidapi.com/v1/trivia', {
        headers: {
            'X-RapidAPI-Key': `${process.env.RAPIDAPI}`,
            'X-RapidAPI-Host': 'trivia-by-api-ninjas.p.rapidapi.com'
    }}).then(res => {
        return (res.data);
    }).catch(err => {
        console.log(err);
        return ("Error while gathering the trivia question");
    });

    return (question);
}

module.exports.getRandomTriviaQuestion = getRandomTriviaQuestion;
