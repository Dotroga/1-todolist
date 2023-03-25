import React, {memo} from 'react';
import {ListsType} from "./bll/state";
import {useAppSelector} from "./bll/store";
import {SideBar} from "./Components/SideBar/SideBar";
import {Route, Routes} from "react-router-dom";
import {List} from "./Components/List/List";
import styled from "styled-components";

export const App = memo(()  => {
    const lists = useAppSelector<ListsType[]>(state => state.lists)
  return (
    <WrapperApp>
      <SideBar/>
        <div>
            <Routes>
                <Route path={'/'} element={lists.map(l=><List key={l.id} list={l}/>)}/>
                {lists.map(l=>
                    <Route key={l.id} path={`/${l.title}`} element={<List list={l}/>}/>)}
            </Routes>
        </div>
    </WrapperApp>
  );
})

const WrapperApp = styled.div`
  display: flex;
`

