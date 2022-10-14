import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';

import { BrowserRouter } from 'react-router-dom';
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
const root = ReactDOM.createRoot(document.getElementById('root'));
/* eslint-disable import/first */
import { extendTheme } from '@chakra-ui/react'

// 2. AddTem your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false, 
  global: {
    'html, body': {
      color: 'gray.600',
      lineHeight: 'tall',
    },
    a: {
      color: 'teal.500',
    },
  },
  colors: {
    brand: {
      primary: "#00DDFF",
      greyPrimary: "#38383d",
      greySecondary: "#42414d",
    }
  }
}


import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
const sagaMiddleware = createSagaMiddleware();

import {Provider} from 'react-redux'
const middleWare =[sagaMiddleware];
const store = createStore(rootReducer , composeWithDevTools(applyMiddleware(...middleWare)));
sagaMiddleware.run(rootSaga);

export default store;

// 3. extend the theme
const theme = extendTheme({ config });
import {  Navigate, useNavigate } from 'react-router-dom'

import { Flex, Box, useColorMode } from "@chakra-ui/react";
import { CentralTheme, lightBg } from "./theme";
const Header = () => {
  const { toggleColorMode } = useColorMode()
   let navigate = useNavigate();
 return(
    <Flex color='white'>
      <Flex onClick={toggleColorMode} >
      {
        CentralTheme().bgColor === lightBg ?
          'Light Mode'
        :
          'Dark Mode'
      }
      </Flex>
    </Flex>
  )
};

import { NhostClient, NhostReactProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'

//@TODO replace subdomain
const nhost = new NhostClient({
  subdomain: "",
  region: "eu-central-1"
})
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <NhostReactProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
    
     <BrowserRouter>
     <ChakraProvider theme={theme}>
      <App></App>
    </ChakraProvider>
    </BrowserRouter>
    </NhostApolloProvider>
    </NhostReactProvider>
    </Provider>
  </React.StrictMode>
);


