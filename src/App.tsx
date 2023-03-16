import React, {useCallback} from 'react';
import s from './App.module.css'
import TodoList from "./Components/ToDoList/TodoList";
import SuperInput from "./Components/SuperInput/SuperInput";
import {addNewListAC} from "./bll/listsReducer";
import {ListsType} from "./bll/state";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {SideBar} from "./Components/SideBar/SideBar";
import {NavLink, Route, Routes} from "react-router-dom";
import {findAllByDisplayValue} from "@testing-library/react";

const App = ()  => {

  let lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)

  const dispatch = useDispatch()
  //
  // const addList = useCallback((title: string) =>
  //   dispatch(addNewListAC(title)),[dispatch])

  return (
    <div className={s.App}>
      <SideBar/>
      {lists.map((l,i)=>
          <NavLink key={i} to={`/${l.title.split(" ").join("")}`}>{l.title}</NavLink>
      )}
      {/*<NavLink to={{}} >Hello</NavLink>*/}
      {/*<NavLink to={'/todo'} >todo</NavLink>*/}
      {/*<div className={s.NewToDo}>*/}
      {/*  <SuperInput callBack={addList} title='Add list'/>*/}
      {/*</div>*/}
      <div className={s.TodoLists}>
        <Routes>
          {lists.map(l=>
            <Route path={`/${l.title.split(" ").join("")}`}
                   element={<TodoList key={l.id} list={l}/>}/>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;