const env = {
    enviroment: process.env.NODE_ENV || 'development',
    api_base_url: process.env.APP_API_BASE_URL || 'https://example.com',
    msw_enabled: process.env.APP_MSW_ENABLED || 'false',
    eventcenter_base_url: process.env.APP_EVENTCENTER_BASE_URL || 'https://eventcenter.com',
    api_gateway_url: process.env.APP_API_GATEWAY_URL || 'https://gateway.com',
    app_server_enviornment: process.env.APP_SERVER_ENVIRONMENT || 'production',
    socket_connection_server: process.env.APP_SOCKET_SERVER || 'wss://socketserver.com',
    app_api_url: process.env.APP_API_URL || 'https://api.com',
    app_registration_url: process.env.APP_REGISTRATION_URL || 'https://registration.com',
  }