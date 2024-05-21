import React from 'react';
import { Provider } from 'react-redux';
import MainNavigation from './src/navigation/MainNavigation'
import { Provider as PaperProvider } from 'react-native-paper';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';



export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <MainNavigation />
        </PaperProvider>
      </PersistGate>
    </Provider>


  );

}
