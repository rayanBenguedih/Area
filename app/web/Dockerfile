FROM node:latest

WORKDIR /app/dev
COPY package.json .

RUN npm i
COPY . .

RUN  apt-get update && apt-get -y install jq
RUN npm install
RUN npm install -g expo
RUN npm install -g eas-cli

ENV EXPO_TOKEN sjH-gYjl61yiqUTChHRCYSR7bONsu2GmnKjqAMn_
ENV EAS_NO_VCS 1
# RUN eas build -p android --profile preview

RUN eas build:list --json --non-interactive --limit=1 --platform=android > toto.json
RUN python3 scripter.py
# RUN cat test2.json
RUN wget $(cat test2.json | jq -r '.[0].artifacts.buildUrl')
RUN cp *.apk main.apk

EXPOSE 8081
RUN npm run build
CMD npm run serve