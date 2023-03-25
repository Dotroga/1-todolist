import React from 'react';
import {store} from "../src/bll/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";


export const ReduxProviderDecorator = (storyFn: ()=> React.ReactNode) =>
  <Provider store={store}>{storyFn()}</Provider>

export const RouterAndReduxProviderDecorator = (storyFn: ()=> React.ReactNode) =>
  <BrowserRouter>
    <Provider store={store}>
      {storyFn()}
    </Provider>
  </BrowserRouter>


