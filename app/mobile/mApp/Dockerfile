FROM node:latest
COPY package.json .
WORKDIR /app/mApp
COPY . .
# RUN ls
# RUN cp *.apk toto

RUN  apt-get update && apt-get -y install jq
RUN npm install
RUN npm install -g expo
RUN npm install -g eas-cli
ENV EXPO_TOKEN sjH-gYjl61yiqUTChHRCYSR7bONsu2GmnKjqAMn_
ENV EAS_NO_VCS 1
RUN eas build -p android --profile preview

RUN eas build:list --json --non-interactive --limit=1 --platform=android > toto.json
RUN python3 scripter.py
# RUN cat test2.json
RUN wget $(cat test2.json | jq -r '.[0].artifacts.buildUrl')
RUN cp *.apk main.apk
RUN ls
# COPY . .

## Voir avec les petiots comment ils font pour build
## Voir aussi s'il faut installer un émulateur pour pouvoir build le petiot
