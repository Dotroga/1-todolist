import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {Provider} from "react-redux";
import {store} from "./bll/store";
import {BrowserRouter} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

const GlobalStyled = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    margin: 0;
    padding: 0;
  }
  body > #root > div {
    height: 100vh;
  }
  body{
  
    background-color: #232d41;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <GlobalStyled/>
        <App/>
    </Provider>
  </BrowserRouter>
);
