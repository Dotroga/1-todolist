import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {Provider} from "react-redux";
import {store} from "./bll/store";
import {BrowserRouter} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

const GlobalStyled = createGlobalStyle`
  body {
    padding: 20px;
    background-color: #212c41;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
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
