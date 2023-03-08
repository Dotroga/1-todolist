import React from 'react';
import './App.css';
import TodoList from "./Components/ToDoList/TodoList";
import SuperInput from "./Components/SuperInput/SuperInput";
import {addNewListAC} from "./store/listsReducer";
import {ListsType} from "./state";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

const App = ()  => {

  let lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)

  const dispatch = useDispatch()

  const addList = (title: string) => dispatch(addNewListAC(title))

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