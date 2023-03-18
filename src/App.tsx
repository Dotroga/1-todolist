import React from 'react';
import s from './App.module.css'
import {ListsType} from "./bll/state";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {SideBar} from "./Components/SideBar/SideBar";
import {Route, Routes} from "react-router-dom";
import {List} from "./Components/List/List";


const App = ()  => {

  const lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)

  return (
    <div className={s.App}>
      <SideBar/>
      <div className={s.TodoLists}>
        <Routes>
          {lists.map(l=>
            <Route
              key={l.id}
              path={`/${l.title}`}
              element={<List list={l}/>}/>)}
          <Route
            path={'/'}
            element={lists.map(l=><List list={l}/>)}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;