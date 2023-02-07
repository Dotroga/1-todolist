import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {SuperInput} from "./Components/SuperInput/SuperInput";


export type ListsType = {id: string, title: string}
export type TaskType = { id: string, title: string, isDone: boolean }
export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TasksType = {
  [key: string]: {
    data: TaskType[]
    filter: FilterValueType
  }
}
type StateType = {
  lists : ListsType[]
  tasks : TasksType
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  const [state, setState] = useState<StateType>({
    lists: [
      {id: todolistId1, title: "What to learn"},
      {id: todolistId2, title: "What to buy"}
    ],
    tasks: {
      [todolistId1]: {
        data: [
          {id: v1(), title: "HTML&CSS", isDone: true},
          {id: v1(), title: "JS", isDone: true}
        ],
        filter: "All"
      },
      [todolistId2]: {
        data: [
          {id: v1(), title: "Books", isDone: true},
          {id: v1(), title: "Food", isDone: false}
        ],
        filter: "Active"
      }}})

  const addTask = (listId: string, title: string) => {
    const newTask: TaskType = {id: v1(), title: title, isDone: false}
      setState({...state,
        tasks: {...state.tasks,
          [listId]: {...state.tasks[listId],
            data: [newTask, ...state.tasks[listId].data]}}})
  }
  const addTaskList = (title: string) => {
    const id = v1()
    setState({...state,
      lists:[{id, title},...state.lists],
      tasks:{...state.tasks, [id]:{data:[], filter: 'Active'}}})
  }
  const removeTask = (listId: string, taskId: string) => {
    setState({...state,
      tasks:{...state.tasks,
    [listId]: {...state.tasks[listId],
    data: [...state.tasks[listId].data.filter(t=>t.id!==taskId)]}}})
  }
  const changeFilter = (listId: string, filter: FilterValueType) => {
    setState({...state, tasks:
        {...state.tasks, [listId]:
        {...state.tasks[listId], filter}}})
  }
  const changeTaskStatus = (listId: string, taskId: string, isDone: boolean) => {
    setState({...state,
      tasks:{...state.tasks,
        [listId]: {...state.tasks[listId],
          data: [...state.tasks[listId].data.map(t=>t.id === taskId ? {...t, isDone} : t)]}}})
  }
  const renameTaskList = (listId: string, title: string) => {
    setState({...state, lists: state.lists.map(l=>l.id===listId ?{...l, title}: l)})
  }
  const renameTask = (listId: string, taskId:string, title: string) => {
    setState({...state, tasks:{...state.tasks,
        [listId]:{...state.tasks[listId],
          data: state.tasks[listId].data.map(t=>t.id===taskId?{...t, title}: t)}}})
  }

  return (
    <div className="App">
      <SuperInput callBack={addTaskList}/>
      {state.lists.map((l)=>{
        const tasksForFilter = state.tasks[l.id].filter === 'Active'
          ? state.tasks[l.id].data.filter(t => !t.isDone)
          : state.tasks[l.id].filter === 'Completed'
            ? state.tasks[l.id].data.filter(t => t.isDone)
            : state.tasks[l.id].data
        return(
          <TodoList
            listId={l.id}
            key={l.id}
            title={l.title}
            tasks={tasksForFilter}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={state.tasks[l.id].filter}
            renameTask={renameTask}
            renameTaskList={renameTaskList}
          />)})}
    </div>
  );
}

export default App;