import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './AppRoute'
import { store } from './redux/store/store'

function App() {
  return (
     <Provider store={store}>
       <BrowserRouter>
       <AppRoute/>
       </BrowserRouter>
      </Provider>
      
  );
}

export default App;
