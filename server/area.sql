DROP DATABASE if exists areadb;

CREATE DATABASE areadb;

USE areadb;

CREATE TABLE users (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    provider VARCHAR(32) NOT NULL,
    providerUserId VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(64) NOT NULL UNIQUE,
    username VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(255) UNIQUE,
    discordUserId VARCHAR(255) UNIQUE,
    twitchUserId VARCHAR(255) UNIQUE
);

CREATE TABLE areas (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    userId VARCHAR(255) NOT NULL,
    areaName VARCHAR(255) NOT NULL,
    actionService VARCHAR(64) NOT NULL,
    actionLabel VARCHAR(64) NOT NULL,
    reactionService VARCHAR(64) NOT NULL,
    reactionLabel VARCHAR(64) NOT NULL,

    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE services (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    serviceName VARCHAR(255) NOT NULL,
    actions JSON,
    reactions JSON
);

INSERT INTO services (serviceName, actions, reactions) VALUES
('discord', '{ "ping_area_bot": "Ping (@AREA) AREA bot"}', '{}'),
('twitch', '{}', '{"get_top10_streamed_games": "Receive top 10 streamed games", "get_clip_random_game": "Receive clip of a random game"}'),
('sncf', '{}', '{"get_jouneys_stations": "Get journeys between two stations", "get_departures_station": "Get next departures of a station"}'),
('weather', '{}', '{"get_weather_lille": "Get actual weather in Lille", "get_week_weather_lille": "Get week weather in Lille", "get_outfit_advice_lille": "Get outfit advice for weather in Lille"}'),
('rapidapi', '{}', '{"get_random_trivia": "Get random trivia", "get_date_lille": "Get actual date and time in Lille", "get_timezones_europe": "Get all timezones in Europe", "get_short_url": "Get shortened URL", "get_qrcode": "Get QRCode from url"}');