import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { SideBar } from "Components/SideBar/SideBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { List } from "Components/List/List";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import { Login } from "Components/Login/Login";
import { initializeAppTC } from "redux/authReducer";
import { SpinnerLoader } from "Components/Super/Loader/SpinerLoader";
import { ErrorSnackbar } from "Components/ErrorSnackbar/ErrorSnackbar";
import { ListType } from "redux/listsReducer";


export const App = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const isInitialized = useAppSelector((state) => state.auth.isInitialized);
  const theme = useAppSelector((state)=> state.StatusOffWindows.theme)
  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);
  useEffect(() => {
    !isLoggedIn && navigate("/login");
  }, [isLoggedIn]);
  const lists = useAppSelector<ListType[]>((state) => state.lists);
  if (!isInitialized) return <SpinnerLoader/>;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      <WrapperApp>
        {isLoggedIn && <SideBar/>}
        <Content>
          <Routes>
            <Route
              path={"/"}
              element={lists.map((l, i) => (
                <div key={l.id}>
                  <List list={l}/>
                  {i !== lists.length - 1 && <hr/>}
                </div>
              ))}
            />
            {lists.map((l) => (
              <Route key={l.id} path={`/${l.title}`} element={<List list={l}/>}/>
            ))}
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<h1>404</h1>}/>
          </Routes>
        </Content>
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${({theme})=>theme.colors.bg};
  color: ${({theme})=>theme.colors.font};;
  box-shadow: 0 0 15px 1px ${({theme})=>theme.colors.shadow};
  margin: 40px 40px 40px 20px;
  width: 100%;
  overflow: auto;
  transition: 0.2s;
  ::-webkit-scrollbar {
    width: 22px; /* ширина scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    border: 5px solid  ${({theme})=>theme.colors.bg};
    background-color: ${({theme})=>theme.colors.color}; /* цвет плашки */
    border-radius: 20px; /* закругления плашки */
  }
  hr {
    margin: 0 30px;
    border: none;
    border-top: 1px solid #37445f;
  }
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
