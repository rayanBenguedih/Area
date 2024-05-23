
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

# How to use the Area - Getting Started

To use the Area, you need to start the server once the server is started you connect on the web page, starting it as well.
From the web page, it is available to download the mobile app in an .apk (Only available on Android)

Once the server and the website are up and running, you will need to invite the bot discord "Area" to your own discord server.
On the area, you will link the action: ping the discord bot "@area" on discord, and the bot will perform the selected reaction(s).
To invite the bot, you will need to go into your profile page and click on the associated button

# How to use the Area - Web version
Assuming both the web version and the server are running according to the "Getting Started", you can log in using google or any existing account on the area. If you don't have an existing account you can create one.

After being logged in, you will be directed to the homepage with a button called "Create Area" which will allow you to get started with your own area, registering the various available services on your area and using the varied actions/reactions from it.

Have fun!


# How to use the Area - Mobile version
Assuming your downloaded and installed the .APK like mentionned in the "Getting Started" the app will invite you to input the IP and the PORT adress where the server is running to allow it to connect directly.

You need to log in on an existing account, or to create one if you don't have an account yet.
After logging in, you will be directed to the home page, where a button "Create your area" will appear, allowing you to start using the various services available.



# Trivia
The web page was coded using React and the mobile application using React Native, those two technologies are growing dominant over the old ones (Such as Symfony) for web development and mobile application.

The server is using nodejs.

A very amusing fact, React and React Native are both Javascript framework, meaning that the web app and the mobile app were done with Javascript.
Nodejs is an application made with javascript, but it is not a framework.

Swagger can be found: 
https://app.swaggerhub.com/apis/rayanBenguedih/AreApp/1.0.0

# Services available
Here you will find all the services (API) supported by the server listed below:

- Discord
- Twitch
- SNCF
- RapidAPI
- Hideuri
- ACME.code
- weather.service.msn.com
