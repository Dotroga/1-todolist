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
`

const Content = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  color: white;
`

