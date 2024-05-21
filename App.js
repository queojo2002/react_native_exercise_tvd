import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import MainNavigation from './src/navigation/MainNavigation'
import { Provider as PaperProvider } from 'react-native-paper';



export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <MainNavigation />
      </PaperProvider>
    </Provider>
  );

}
