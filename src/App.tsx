import React, {memo, useEffect} from 'react';
import {ListType} from "./redux/state";
import {useAppDispatch, useAppSelector} from "./redux/store";
import {SideBar} from "./Components/SideBar/SideBar";
import {Route, Routes, useNavigate} from "react-router-dom";
import {List} from "./Components/List/List";
import styled from "styled-components";
import {Login} from "./Components/Login/Login";
import {initializeAppTC} from "./redux/authReducer";
import {SpinnerLoader} from "./Components/Super/Loader/SpinerLoader";

export const App = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector((state)=>state.auth.isLoggedIn)
    const isInitialized = useAppSelector((state)=>state.auth.isInitialized)
    useEffect( () => {
         dispatch(initializeAppTC())
    }, [])
    useEffect(()=> {
        !isLoggedIn && navigate('/login')
    }, [isLoggedIn])
    const lists = useAppSelector<ListType[]>(state => state.lists)
    if (!isInitialized) return <SpinnerLoader/>
    return <WrapperApp>
        {isLoggedIn && <SideBar/>}
        <Content>
            <Routes>
                <Route path={'/'} element={lists.map((l,i) =>
                    <div key={l.id}>
                        <List list={l}/>
                        {i !== lists.length - 1 && <hr/>}
                    </div>
                )}
                />
                {lists.map((l) =>
                    <Route key={l.id} path={`/${l.title}`} element={<List list={l}/>}/>
                )}
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<h1>404</h1>}/>
            </Routes>
        </Content>
    </WrapperApp>
})

const WrapperApp = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1300px;
  width: 100%;
  
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #2e384c;
  color: #989fa7;
  box-shadow: 0 0 15px 1px #1a2434;
  margin: 40px 40px 40px 20px;
  width: 100%;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 22px; /* ширина scrollbar */

  }

  ::-webkit-scrollbar-thumb {
    border: 5px solid rgb(46, 56, 78);
    background-color: #fbbd49; /* цвет плашки */
    border-radius: 20px; /* закругления плашки */
  }

  hr {
    margin: 0 30px;
    border: none;
    border-top: 1px solid #37445f;
  }
`

