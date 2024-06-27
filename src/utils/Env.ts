export const environments = {
    development: {
        NODE_ENV: "development",
        APP_EVENTCENTER_BASE_URL: "https://dev.eventbuizz.com",
        APP_API_BASE_URL: "https://apidev.eventbuizz.com/mobile",
        APP_SOCKET_SERVER: "https://devsocket.eventbuizz.com:3000",
        APP_API_GATEWAY_URL: "https://piy49faln0.execute-api.eu-west-1.amazonaws.com/Development",
        APP_MSW_ENABLED: true
    },
    stage: {
        NODE_ENV: "stage",
        APP_EVENTCENTER_BASE_URL: "https://stage.eventbuizz.com",
        APP_API_BASE_URL: "https://apistage.eventbuizz.com/mobile",
        APP_SOCKET_SERVER: "https://devsocket.eventbuizz.com:3000",
        APP_API_GATEWAY_URL: "https://piy49faln0.execute-api.eu-west-1.amazonaws.com/Development",
        APP_MSW_ENABLED: true
    },
    live: {
        NODE_ENV: "live",
        APP_EVENTCENTER_BASE_URL: "https://my.eventbuizz.com",
        APP_API_BASE_URL: "https://apiplugnplay.eventbuizz.com/mobile",
        APP_SOCKET_SERVER: "https://devsocket.eventbuizz.com:3000",
        APP_API_GATEWAY_URL: "https://piy49faln0.execute-api.eu-west-1.amazonaws.com/Development",
        APP_MSW_ENABLED: true
    }
};