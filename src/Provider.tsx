import React, { useEffect } from 'react'
import {UseEventService} from './application/redux/store/services/useEventServices';
import UseEnvServices from './application/redux/store/services/useEnvServices';
import { ToastContainer } from 'react-toastify';
import WebNavigation from './navigation/web/Navigator'
import  './assets/css/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { ImageBackground, StyleSheet, View } from 'react-native';
import NativeBaseProvider from './navigation/routes/NativeBaseProvider';
export const Provider = () => {
    const { FetchEvent,event} = UseEventService()
    const {  _env } = UseEnvServices()
    const { updateEnv } = UseEnvServices()
    const currentUrl = window.location.href;
    const matchResult = currentUrl.match(/:(\d+)\/([^/]+)/);
    const eventId = matchResult ? matchResult[2] : null;
 
    useEffect(() => {
    updateEnv({
      enviroment: "development",
      api_base_url: "https://apistage.eventbuizz.com/mobile",
      eventcenter_base_url: "https://stage.eventbuizz.com",
      socket_connection_server: "https://devsocket.eventbuizz.com:3000",
      app_api_url: "https://piy49faln0.execute-api.eu-west-1.amazonaws.com/Development",
      msw_enabled: '',
      api_gateway_url: "https://uut0ih5zqd.execute-api.eu-west-1.amazonaws.com/Development",
      app_server_enviornment: "development",
      app_registration_url: "https://registration.url.com"
    });
    }, [])
    useEffect(() => {
      if (eventId !== undefined && _env.api_base_url) {
          FetchEvent(eventId as string)
      }
    }, [FetchEvent, eventId, _env.api_base_url])
    const image = { uri: `${_env.eventcenter_base_url}/assets/event/app_background/${event?.settings?.app_background_image}`};
  return (
    <NativeBaseProvider>
      <ToastContainer/>
      <View style={styles.container}>
        <ImageBackground style={styles.banner} source={image} >
          <WebNavigation />
        </ImageBackground>
      </View>
    </NativeBaseProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
   banner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    resizeMode: "contain",
    backgroundColor: '#1D9FE4',
  }
});