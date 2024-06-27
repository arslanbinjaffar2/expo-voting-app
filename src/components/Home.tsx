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