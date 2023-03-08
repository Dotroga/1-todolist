import React from 'react';
import './App.css';
import TodoList from "./Components/ToDoList/TodoList";
import SuperInput from "./Components/SuperInput/SuperInput";
import {
  addNewListAC,
  changeFilterAC,
  removeListAC,
  renameListAC
} from "./store/listsReducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
  renameTaskAC,
} from "./store/taskReducer";
import {FilterType, ListsType, TasksType} from "./state";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

const App = ()  => {

  let lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)
  let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

  const dispatch = useDispatch()

  const addTaskList = (title: string) =>
    dispatch(addNewListAC(title))
  const addTask = (listId: string, title: string) =>
    dispatch(addTaskAC(listId,title))
  const removeTask = (listId: string, id: string) =>
    dispatch(removeTaskAC(listId, id))
  const changeTask = (listId: string, id: string, isDone: boolean) =>
    dispatch(changeTaskStatusAC(listId, id, isDone))
  const renameTask = (listId: string, id: string, title: string) =>
    dispatch(renameTaskAC(listId, id, title))
  const renameTaskList = (listId: string, title: string) =>
    dispatch(renameListAC(listId, title))
  const removeTaskList = (listId: string) =>
    dispatch(removeListAC(listId))
  const changeFilter = (listId: string, filter: FilterType) =>
    dispatch(changeFilterAC(listId, filter))

  return (
    <div className="App">
      <div className='NewToDO'>
        <SuperInput callBack={addTaskList} title='Add list'/>
      </div>
      <div className='TodoList'>
        {lists.map((l)=>{
          const tasksForFilter = l.filter === 'Active'
            ? tasks[l.id].filter(t => !t.isDone)
            : l.filter === 'Completed'
              ? tasks[l.id].filter(t => t.isDone)
              : tasks[l.id]
          return(
            <TodoList
              key={l.id}
              list={l}
              tasks={tasksForFilter}
              addTask={addTask}
              removeTask={removeTask}
              changeTask={changeTask}
              renameTask={renameTask}
              removeTaskList={removeTaskList}
              changeFilter={changeFilter}
              renameTaskList={renameTaskList}
          />)})}
      </div>
    </div>
  );
}

export default App;