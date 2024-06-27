import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Platform } from 'react-native';
import { Router, Routes, Route } from './routing.web';
import Home from './src/components/Home';
import Login from './src/components/web/auth/Login'
const image = { uri: "https://picsum.photos/3500"};
import { Provider } from 'react-redux';
import {store,persistor} from './src/redux/store/Index'
import { PersistGate } from 'redux-persist/integration/react'
function App () {
  const [selectedPokemon,setSelectedPokemon]=useState(null) 
    return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>

      <View style={styles.container}>
        <ImageBackground style={styles.banner} source={image}>
        <Router>
            <Routes>
              <Route path="/" element={<Home  />} />
              <Route path='login' element={<Login/>}/>
            </Routes>
          </Router>
        </ImageBackground>
      </View>
        </PersistGate>
      </Provider>

    );
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
    resizeMode: "cover",
    backgroundColor: '#1D9FE4',
  }
});
export default App;