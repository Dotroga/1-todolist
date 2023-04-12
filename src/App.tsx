import React, {memo, useEffect} from 'react';
import {ListType} from "./redux/state";
import {useAppDispatch, useAppSelector} from "./redux/store";
import {SideBar} from "./Components/SideBar/SideBar";
import {Route, Routes} from "react-router-dom";
import {List} from "./Components/List/List";
import styled from "styled-components";
import {fetchListTC} from "./redux/listsReducer";

export const App = memo(() => {

    const dispatch = useAppDispatch()
    useEffect(() => dispatch(fetchListTC()), [])
    const lists = useAppSelector<ListType[]>(state => state.lists)
    return <WrapperApp>
        <SideBar/>
        <Content>
            <Routes>
                <Route path={'/'} element={lists.map(l => <List key={l.id} list={l}/>)}/>
                {lists.map(l =>
                    <Route key={l.id} path={`/${l.title}`} element={<List list={l}/>}/>)}
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
  background-color: rgb(46, 56, 78);
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
`

