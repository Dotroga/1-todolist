import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./Components/ToDoList/TodoList";
import SuperInput from "./Components/SuperInput/SuperInput";
import {addNewListAC} from "./bll/listsReducer";
import {ListsType} from "./state";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";

const App = ()  => {

  let lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)

  const dispatch = useDispatch()

  const addList = useCallback((title: string) =>
    dispatch(addNewListAC(title)),[dispatch])

  return (
    <div className="App">
      <div className='NewToDO'>
        <SuperInput callBack={addList} title='Add list'/>
      </div>
      <div className='TodoList'>
        {lists.map(l=><TodoList key={l.id} list={l}/>)}
      </div>
    </div>
  );
}

export default App;