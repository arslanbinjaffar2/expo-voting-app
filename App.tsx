import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Platform } from 'react-native';
import { Router, Routes, Route } from './routing.web';
import Home from './src/components/Home';
const image = { uri: "https://picsum.photos/3500"};
import { Provider } from 'react-redux';
import {store} from './src/redux/store/Index'



const event_url=""
function App () {
  const [selectedPokemon,setSelectedPokemon]=useState(null) 

    return (
      <Provider store={store}>
      <View style={styles.container}>
        <ImageBackground style={styles.banner} source={image}>
        <Router>
            <Routes>
              <Route path="/" element={<Home  />} />
            </Routes>
          </Router>
        </ImageBackground>
      </View>
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