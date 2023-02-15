import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {SuperInput} from "./Components/SuperInput/SuperInput";
import {addListAC, listsReducer} from "./reducers/listsReducer";
import {
  addNewTaskListAC,
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
  renameTaskAC,
  tasksReducer
} from "./reducers/taskReducer";


export type ListsType = {id: string, title: string, filter: string}
export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksType = {
  [key: string]: TaskType[]
}

export let todolistId1 = v1();
export let todolistId2 = v1();


function App() {

  const [lists, listsD] = useReducer(listsReducer,[
    {id: todolistId1, title: "What to learn", filter: "Active"},
    {id: todolistId2, title: "What to buy", filter: "Active"}
  ])

  const[tasks, tasksD] = useReducer(tasksReducer,{
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Books", isDone: true},
      {id: v1(), title: "Food", isDone: false}

    ]})

  const addTaskList = (title: string) => {
    const id = v1()
    listsD(addListAC(id, title))
    tasksD(addNewTaskListAC(id))
  }

  const addTask = (listId: string, title: string) => tasksD(addTaskAC(listId,title))
  const removeTask = (listId: string, id: string) => tasksD(removeTaskAC(listId, id))
  const changeTask = (listId: string, id: string, isDone: boolean) =>
    tasksD(changeTaskStatusAC(listId, id, isDone))
  const renameTask = (listId: string, id: string, title: string) =>
    tasksD(renameTaskAC(listId, id, title))






  const removeTaskList = (listId: string) => {
    // setState({...state,
    //   lists: state.lists.filter(l=>l.id!==listId)})
    // delete state.tasks[listId]
  }
  const changeFilter = (listId: string, filter: FilterValueType) => {
    // setState({...state, tasks:
    //     {...state.tasks, [listId]:
    //     {...state.tasks[listId], filter}}})
  }
  const renameTaskList = (listId: string, title: string) => {
    // setState({...state, lists: state.lists.map(l=>l.id===listId ?{...l, title}: l)})
  }

  return (
    <div className="App">
      <div className='NewToDO'><SuperInput callBack={addTaskList} /></div>
      <div className='TodoList'>
        {lists.map((l)=>{
          return(
            <TodoList
              listId={l.id}
              key={l.id}
              title={l.title}
              tasks={tasks}
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