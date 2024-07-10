import React, { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import {Provider} from './src/Provider'
import {store,persistor} from './src/application/redux/store/Index'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-toastify/dist/ReactToastify.css';

function App () {
  const [selectedPokemon,setSelectedPokemon]=useState(null) 
    return (
      <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Provider/>
        </PersistGate>
      </ReduxProvider>

    );
}

export default App;