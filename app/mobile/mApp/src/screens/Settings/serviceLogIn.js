import { authorize } from 'react-native-app-auth'

const env = process.env;

export function logToDiscord() {
    const config = {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_SECRET,
      redirectUrl: 'BUNDLE_IDENTIFIER://oauthredirect',
      scopes: ['email', 'identify'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://discordapp.com/api/oauth2/authorize',
        tokenEndpoint: 'https://discordapp.com/api/oauth2/token',
        revocationEndpoint: 'https://discordapp.com/api/oauth2/token/revoke'
      }
    }
}