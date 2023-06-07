import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { SideBar } from "Components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import { SpinnerLoader } from "Components/Super/Loader/SpinerLoader";
import { ErrorSnackbar } from "Components/Super/ErrorSnackbar/ErrorSnackbar";
import {selectIsInitialized, selectIsLoggedIn} from "redux/auth/auth.selectors";
import {selectTheme} from "redux/app.selectors";
import {authThunks} from "redux/auth/auth.reducer";
import {Content} from "Components/Content/Content";


export const App = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isInitialized = useAppSelector(selectIsInitialized);
  const theme = useAppSelector(selectTheme)

  useEffect(() => {dispatch(authThunks.initializeApp())}, []);
  useEffect(() => {!isLoggedIn && navigate("/login");}, [isLoggedIn]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled/>
      <WrapperApp>
        {isInitialized
          ? <>
            {isLoggedIn && <SideBar/>}
            <Content/>
          </>
          : <SpinnerLoader/>}
        <ErrorSnackbar/>
      </WrapperApp>
    </ThemeProvider>
  );
});

const WrapperApp = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1300px;
  width: 100%;
  transition: 0.3s;
  background-color: ${({theme}) => theme.colors.mainBackground};
`;

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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    div#root{
      display: flex;
      justify-content: center;
      transition: 0.3s;
      background-color: ${({theme})=>theme.colors.mainBackground}
    }
  }
`;
