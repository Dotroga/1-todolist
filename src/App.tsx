import React, {useCallback} from 'react';
import s from './App.module.css'
import {ListsType} from "./bll/state";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {SideBar} from "./Components/SideBar/SideBar";
import {Route, Routes} from "react-router-dom";


const App = ()  => {

  const lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)


  const dispatch = useDispatch()
  //
  // const addList = useCallback((title: string) =>
  //   dispatch(addNewListAC(title)),[dispatch])

  return (
    <div className={s.App}>
      <SideBar/>
      <div className={s.TodoLists}>
        <Routes>
          {lists.map(l=><Route key={l.id} path={`/${l.title.split(" ").join("")}`} element={<div>{l.title}</div>}/>)}
          {/*<Route*/}
          {/*  path={'/'}*/}
          {/*  element={lists.map(l=><TodoList key={l.id} list={l}/>)}*/}
          {/*/>*/}
          {/*{lists.map(l=>*/}
          {/*  <Route path={`/${l.title.split(" ").join("")}`}*/}
          {/*         element={<TodoList key={l.id} list={l}/>}*/}
          {/*  />)}*/}
        </Routes>
      </div>
    </div>
  );
}

export default App;