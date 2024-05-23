
# Area

A project involving web development, mobile application development and server development with a free choice for the technologies to use.

For the web we decided to use React
The mobile application was developped using React Native
The Server was made using node.js

The point of the project is to create the three components and make them interact with each other, using the web page and the mobile app as pure front services which aren't supposed to handle anything except the user's inputs, sending them to the server, and handling the server's output to display it to the user.

The server is meant to process the user's input sent by the apps and then, make API calls, process the API's output to send it to the web app / Mobile app in order to do what is called "actions / Reactions" with the various "services" available.


The Actions are actions the user can do, for instance, pressing a button to send an email, or press a button to recieve a youtube video.
the Reactions are Actions triggered by other actions that should be automated. For instance, if the user sends en email, a tweet is created about it. The server acted, doing something else, depending on the user's actions.

Services are the API available to use. Discord has an API, it is a service that can be placed into the Area.

This Read.me is intended for developpers and will use technical languages, we will assume you already got familiar with the readme for users.

# How to use the Area - Add a new API

In order to add a new API it is required for you to start getting familiar with the API you desire to use, once it is done, you will need to create a folder in the route:
B-DEV-500-LIL-5-1-AREA-ALEXIS.DEVLOO/server/src/API/API${name of your api}

Once it is done, you will need to use javascript. Assuming your new API is not an existing API, you will need to create a file called: "init.js"
this file will have an asynchronous function which will initiate the authentification with the said API and display in the terminal how the request went to see if the API initiated well.

Export the said function into the folder: "B-DEV-500-LIL-5-1-AREA-ALEXIS.DEVLOO/server/src/API/" there is a file named: "initAPI.js" inside of it, you will need to call the function you just made, and call it in that file. As well as add a console.log to precise which API it is, for debug purpose in the future.


In your folder, you'll do each functions required for your calls and requests.
Once it is done, you link each actions to the discords commands.

To do this, read the part: Discord Commands


# How to use the Area - Discord Commands

The Area consists of reactions centered around a bot.

To add new commands to it, here how it goes:

create a new file in the folder: "B-DEV-500-LIL-5-1-AREA-ALEXIS.DEVLOO/server/src/API/APIDiscord/" create a new file named "${API NAME}Commands.js"

Once the file is added, you must create a function "createCommand()" which will create the discord commands with a "SlashCommandBuilder"
Once created, you will go into the file: command.js and you can add your command creator into the function: "createCommand" and add them into the array: "commands"

It is up to you to code what the command wil do with the reply commands which gets called in the "managecommand()" so you must add yourself the function calls and return the correct things.

To avoid timeouts on discord answers, send a temporary answer that gets modified.

# How to use the Area - Link them to the Server

(avec Gregoire)


# Trivia
A discord bot can be made in several languages.
Many API requires authentifications that can be complicated, we strongly discourage you from adding APIs that requires more authentifications than the ones we provide, you will be faced with more complicated problems than just having to add new functions to the server.

You can access the Swagger to this link: https://app.swaggerhub.com/apis/rayanBenguedih/AreApp/1.0.0

# Services available
Here you will find all the services (API) supported by the server listed below:

- Discord
- Twitch
- SNCF
- RapidAPI
- Hideuri
- ACME.code
- weather.service.msn.com

