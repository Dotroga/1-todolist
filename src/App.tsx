import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {SuperInput} from "./Components/SuperInput/SuperInput";
import {addListAC, changeFilterAC, listsReducer, removeTaskListAC, renameTaskListAC} from "./reducers/listsReducer";
import {
  addNewTaskListAC,
  addTaskAC,
  changeTaskStatusAC, deleteArrTasksAC,
  removeTaskAC,
  renameTaskAC,
  tasksReducer
} from "./reducers/taskReducer";


export type ListsType = {id: string, title: string, filter: FilterType}
export type FilterType = 'All' | 'Active' | 'Completed'
export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksType = {
  [key: string]: TaskType[]
}

export let todolistId1 = v1();
export let todolistId2 = v1();


function App() {

  const [lists, listsD] = useReducer(listsReducer,[
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "Active"}])

  const[tasks, tasksD] = useReducer(tasksReducer,{
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}],
    [todolistId2]: [
      {id: v1(), title: "Books", isDone: true},
      {id: v1(), title: "Food", isDone: true}]})

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
  const renameTaskList = (listId: string, title: string) => {
    listsD(renameTaskListAC(listId, title))
  }
  const removeTaskList = (listId: string) => {
    listsD(removeTaskListAC(listId))
    tasksD(deleteArrTasksAC(listId))
  }

  const changeFilter = (listId: string, filter: FilterType) => {
    listsD(changeFilterAC(listId, filter))
  }


  return (
    <div className="App">
      <div className='NewToDO'><SuperInput callBack={addTaskList} /></div>
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