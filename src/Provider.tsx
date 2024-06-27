import React, { useEffect } from 'react'
import useEventServices from './redux/store/services/useEventServices';
import UseEnvServices from './redux/store/services/useEnvServices';
export const Provider = ({children}: {children: React.ReactNode}) => {
    const event_url="annual-convocation-3961"
    const { FetchEvent} = useEventServices()
    const {  _env } = UseEnvServices()
    const { updateEnv } = UseEnvServices()

    useEffect(() => {
    updateEnv({
      enviroment: "development",
      api_base_url: "https://dev.eventbuizz.com",
      eventcenter_base_url: "https://apidev.eventbuizz.com/mobile",
      socket_connection_server: "https://devsocket.eventbuizz.com:3000",
      app_api_url: "https://piy49faln0.execute-api.eu-west-1.amazonaws.com/Development",
      msw_enabled: '',
      api_gateway_url: "https://api.gateway.com",
      app_server_enviornment: "development",
      app_registration_url: "https://registration.url.com"
    });
    }, [])
    useEffect(() => {
      if (event_url !== undefined && _env.api_base_url) {
          FetchEvent(event_url)
      }
    }, [FetchEvent, event_url, _env.api_base_url])
  return (
    <>
   {children}
    </>
  )
}

