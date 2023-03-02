import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./Components/ToDoList/TodoList";
import {SuperInput} from "./Components/SuperInput/SuperInput";
import {
  addNewListAC,
  changeFilterAC,
  listsReducer,
  removeListAC,
  renameListAC
} from "./reducers/listsReducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  removeTaskAC,
  renameTaskAC,
  tasksReducer
} from "./reducers/taskReducer";
import {FilterType, listsToDo, tasksToDo} from "./state";

function App() {

  const [lists, listsD] = useReducer(listsReducer, listsToDo)
  const[tasks, tasksD] = useReducer(tasksReducer, tasksToDo)

  const addTaskList = (title: string) => {
    const action = addNewListAC(title)
    listsD(action)
    tasksD(action)
  }
  const addTask = (listId: string, title: string) => tasksD(addTaskAC(listId,title))
  const removeTask = (listId: string, id: string) => tasksD(removeTaskAC(listId, id))
  const changeTask = (listId: string, id: string, isDone: boolean) =>
    tasksD(changeTaskStatusAC(listId, id, isDone))
  const renameTask = (listId: string, id: string, title: string) =>
    tasksD(renameTaskAC(listId, id, title))
  const renameTaskList = (listId: string, title: string) =>
    listsD(renameListAC(listId, title))
  const removeTaskList = (listId: string) => {
    listsD(removeListAC(listId))
    tasksD(removeListAC(listId))}
  const changeFilter = (listId: string, filter: FilterType) =>
    listsD(changeFilterAC(listId, filter))


  return (
    <div className="App">
      <div className='NewToDO'><SuperInput callBack={addTaskList} /></div>
      <div className='TodoList'>
        {lists && lists.map((l)=>{
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