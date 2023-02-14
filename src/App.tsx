import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {SuperInput} from "./Components/SuperInput/SuperInput";


export type ListsType = {id: string, title: string, filter: FilterValueType}
export type TaskType = { id: string, title: string, isDone: boolean }
export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TasksType = {
  [key: string]: TaskType[]
}


export let todolistId1 = v1();
export let todolistId2 = v1();
function App() {


  const [state, setState] = useState<ListsType[]>([
      {id: todolistId1, title: "What to learn", filter: "Active"},
      {id: todolistId2, title: "What to buy", filter: "Active"}
    ])

  const addTask = (listId: string, title: string) => {
    // const newTask: TaskType = {id: v1(), title: title, isDone: false}
    //   setState({...state,
    //     tasks: {...state.tasks,
    //       [listId]: {...state.tasks[listId],
    //         data: [newTask, ...state.tasks[listId].data]}}})
  }
  const addTaskList = (title: string) => {
    // const id = v1()
    // setState({...state,
    //   lists:[{id, title},...state.lists],
    //   tasks:{...state.tasks, [id]:{data:[], filter: 'All'}}})
  }
  const removeTask = (listId: string, taskId: string) => {
    // setState({...state,
    //   tasks:{...state.tasks,
    // [listId]: {...state.tasks[listId],
    // data: [...state.tasks[listId].data.filter(t=>t.id!==taskId)]}}})
  }
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
  const changeTaskStatus = (listId: string, taskId: string, isDone: boolean) => {
    // setState({...state,
    //   tasks:{...state.tasks,
    //     [listId]: {...state.tasks[listId],
    //       data: [...state.tasks[listId].data.map(t=>t.id === taskId ? {...t, isDone} : t)]}}})
  }
  const renameTaskList = (listId: string, title: string) => {
    // setState({...state, lists: state.lists.map(l=>l.id===listId ?{...l, title}: l)})
  }
  const renameTask = (listId: string, taskId:string, title: string) => {
    // setState({...state, tasks:{...state.tasks,
    //     [listId]:{...state.tasks[listId],
    //       data: state.tasks[listId].data.map(t=>t.id===taskId?{...t, title}: t)}}})
  }


  return (
    <div className="App">
      <div className='NewToDO'><SuperInput callBack={addTaskList} /></div>
      <div className='TodoList'>
        {state.map((l)=>{
          return(
            <TodoList
              listId={l.id}
              key={l.id}
              title={l.title}
              removeTaskList={removeTaskList}
              changeFilter={changeFilter}
              renameTaskList={renameTaskList}
            />)})}
      </div>
    </div>
  );
}

export default App;