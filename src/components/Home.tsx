import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
import ViewPoint from './web/ViewPoint';
import  '../assets/css/style.css';
import "react-datepicker/dist/react-datepicker.css";
import useAuthServices from './../redux/store/services/useAuthServices';
import useEventServices from './../redux/store/services/useEventServices';
import UseEnvServices from './../redux/store/services/useEnvServices';
  import { environments } from '../utils/Env';
export default function Home(){
  const { updateEnv,_env } = UseEnvServices()

useEffect(() => {
   // Skipped unchanged code
// Update the object passed to updateEnv to include the missing properties
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
  return(
    <>
  <View style={styles.container}>
         {Platform.OS === 'web' ? <ViewPoint /> : <Text>This is for Mobile</Text>}
    </View>
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  }
});