import { ExpoConfig, ConfigContext } from '@expo/config'
import 'dotenv/config';
export default ({ config }: ConfigContext): Partial<ExpoConfig> => {
  return {
    ...config,
    extra: {
      universalLinks: [
        process.env.EXPO_PUBLIC_NODE_ENV,
        process.env.EXPO_PUBLIC_APP_API_BASE_URL,
        process.env.EXPO_PUBLIC_APP_EVENTCENTER_BASE_URL,
        process.env.EXPO_PUBLIC_APP_SOCKET_SERVER,
        process.env.EXPO_PUBLIC_APP_API_GATEWAY_URL,
        process.env.EXPO_PUBLIC_APP_MSW_ENABLED,
        process.env.EXPO_PUBLIC_APP_SERVER_ENVIRONMENT,
        process.env.EXPO_PUBLIC_REGISTRATION_SITE
      ],
    },
  }
}
